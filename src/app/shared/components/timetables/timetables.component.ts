import { Component, OnInit, ChangeDetectionStrategy,
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
import { Subject } from 'rxjs';
import {
    CalendarEvent,
    CalendarEventAction,
    CalendarEventTimesChangedEvent,
    CalendarView
} from 'angular-calendar';
import { Activity } from '../../models/activity.model';
import { ActivitiesService } from '../../services/activities.service';

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
  selector: 'app-timetables',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './timetables.component.html',
  styleUrls: ['./timetables.component.css']
})
export class TimetablesComponent implements OnInit {

  activityEvents: Activity['events'];
  events: Array<CalendarEvent>;

  view: CalendarView = CalendarView.Week;
  weekStartsOn = new Date().getDay;
  viewDate: Date = new Date();

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

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

  constructor(private activitiesService: ActivitiesService) {
    this.events = [];
   }

  ngOnInit() {
    this.activitiesService.getAllEvents()
      .subscribe(transformedEventData => {
        this.activityEvents = transformedEventData.events;
        this.activityEvents.forEach((activityEvent) => {
          this.events.push(
            {
              start: addHours(startOfDay(addDays(startOfWeek(new Date()), activityEvent.dayOfWeek)), activityEvent.startHour),
              end: addHours(addHours(startOfDay(addDays(startOfWeek(new Date()), activityEvent.dayOfWeek)), activityEvent.startHour),
              activityEvent.endHour - activityEvent.startHour),
              title: activityEvent.activityName,
            }
          );
        });
        this.refresh.next();
    });
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    // this.modalData = { event, action };
    // this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events.push({
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    this.refresh.next();
  }
}
