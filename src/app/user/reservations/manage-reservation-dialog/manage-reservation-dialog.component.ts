import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivitiesService } from 'src/app/shared/services/activities.service';
import { CalendarEvent } from 'angular-calendar';
import { AuthService } from 'src/app/auth/auth.service';
import { Reservation } from 'src/app/shared/models/reservation.model';

interface EventData extends CalendarEvent {
  id: string;
}

@Component({
  selector: 'app-manage-reservation-dialog',
  templateUrl: './manage-reservation-dialog.component.html',
  styleUrls: ['./manage-reservation-dialog.component.css']
})
export class ManageReservationDialogComponent implements OnInit {

  userId: string;
  reservations: Reservation[];
  isReserved = false;

  constructor(public dialogRef: MatDialogRef<ManageReservationDialogComponent>,
    private activitiesService: ActivitiesService, private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: { event: EventData }) { }

  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.activitiesService.getReservationsByUser(this.userId)
      .subscribe(transformedReservationData => {
        this.reservations = transformedReservationData.reservations;
        this.reservations.forEach(reservation => {
          if (reservation.event === this.data.event.id) {
            this.isReserved = true;
          }
        });
    });
    console.log(this.data.event);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDeleteReserve() {
    this.reservations.forEach(reservation => {
      if (reservation.event === this.data.event.id && reservation.exactDate.toString() === this.data.event.start.toISOString()) {
        this.activitiesService.deleteReservation(reservation.id);
      }
    });
    this.dialogRef.close();
  }

  onReserve() {
    const reservation = {
      exactDate: this.data.event.start,
      event: this.data.event.id,
      user: this.userId,
    };
    this.activitiesService.createReservation(reservation);
    this.dialogRef.close();
  }
}
