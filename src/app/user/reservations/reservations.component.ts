import { Component, OnInit, ChangeDetectionStrategy, OnDestroy,
} from '@angular/core';

import {
    startOfDay,
    endOfDay,
    subDays,
    addDays,
    endOfMonth,
    isSameDay,
    isSameMonth,
    addHours,
    addWeeks,
    isSameWeek,
    startOfWeek
} from 'date-fns';
import { Subject, Subscription } from 'rxjs';
import {
    CalendarEvent,
    CalendarEventAction,
    CalendarEventTimesChangedEvent,
    CalendarView
} from 'angular-calendar';
import { Activity } from 'src/app/shared/models/activity.model';
import { ActivitiesService } from 'src/app/shared/services/activities.service';
import { MatDialog } from '@angular/material';
import { ManageReservationDialogComponent } from './manage-reservation-dialog/manage-reservation-dialog.component';
import { AuthService } from 'src/app/auth/auth.service';
import { Reservation } from 'src/app/shared/models/reservation.model';

interface EventData extends CalendarEvent {
  id: string;
}

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};


@Component({
  selector: 'app-reservations',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit, OnDestroy {

  userId: string;
  reservations: Reservation[];
  activityEvents: Activity['events'];
  events: Array<EventData>;
  private eventsSub: Subscription;

  view: CalendarView = CalendarView.Week;
  weekStartsOn = new Date().getDay() ;
  viewDate: Date = new Date();

  refresh: Subject<any> = new Subject();

  //   { example of event
  //     start: subDays(startOfDay(new Date()), 1),
  //     end: addDays(new Date(), 1),
  //     title: 'A 3 day event',
  //     color: colors.red,
  //     actions: this.actions,
  //     allDay: true,
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true
  //     },
  //     draggable: true
  //   },

  constructor(private activitiesService: ActivitiesService, private authService: AuthService, public dialog: MatDialog) {
    this.events = [];
   }

  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.activitiesService.getAllEvents();
    this.eventsSub = this.activitiesService.getEventsUpdateListener()
      .subscribe(transformedEventData => {
        this.events = [];
        this.activityEvents = transformedEventData.events;
        this.activityEvents.forEach((activityEvent) => {
          let dayOfWeek = activityEvent.dayOfWeek;
          if (activityEvent.dayOfWeek < this.weekStartsOn) {
            dayOfWeek += 7;
          }
          let color = colors.blue;
          this.activitiesService.getReservationsByUser(this.userId)
            .subscribe(transformedReservationData => {
              this.reservations = transformedReservationData.reservations;
              this.reservations.forEach(reservation => {
                if (reservation.event === activityEvent.id) {
                  color = colors.yellow;
                }
              });
              this.events.push(
                {
                  // start: addHours(startOfDay(addDays(startOfWeek(new Date()), activityEvent.dayOfWeek)), activityEvent.startHour),
                  start: addHours(startOfDay(addDays(new Date(), dayOfWeek - this.weekStartsOn)), activityEvent.startHour),
                  // end: addHours(addHours(startOfDay(addDays(startOfWeek(new Date()), activityEvent.dayOfWeek)), activityEvent.startHour),
                  // activityEvent.endHour - activityEvent.startHour),
                  end: addHours(addHours(startOfDay(addDays(new Date(), dayOfWeek - this.weekStartsOn)), activityEvent.startHour),
                  activityEvent.endHour - activityEvent.startHour),
                  title: activityEvent.activityName,
                  id: activityEvent.id,
                  color,
                }
              );
              this.refresh.next();
            });
          });
    });

  }

  handleEvent(action: string, event: EventData): void {
    const dialogRef = this.dialog.open(ManageReservationDialogComponent, {data: {event}});
    dialogRef.afterClosed().subscribe(result => {
      this.activitiesService.getAllEvents();
      this.refresh.next();
    });
    // this.modalData = { event, action };
    // this.modal.open(this.modalContent, { size: 'lg' });
  }

  ngOnDestroy() {
    this.eventsSub.unsubscribe();
  }
}
