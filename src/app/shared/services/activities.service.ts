import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Activity } from '../models/activity.model';


@Injectable({ providedIn: 'root' })
export class ActivitiesService {
  // esto se guardará en la base de datos
  private activities: Activity[] = [
    {
      id: 'Pilates',
      name: 'Pilates',
      description: 'Los ejercicios de Pilates Mat buscan mejorar la fuerza abdominal, flexibilidad y control corporal. Algunos de sus principios básicos son: control, fluidez en el movimiento, precisión y respiración. Y sus principales beneficios pasan por aumentar la fuerza muscular, concentración y relajación.',
      imageUrl: '../../../assets/activities/pilates.jpg',
      events: [
        {
        id: 'Pilates_1_9',
        activityName: 'Pilates',
        startHour: 9,
        endHour: 10,
        dayOfWeek: 1,
      },
      {
        id: 'Pilates_2_9',
        activityName: 'Pilates',
        startHour: 9,
        endHour: 10,
        dayOfWeek: 2,
      },
      {
        id: 'Pilates_3_9',
        activityName: 'Pilates',
        startHour: 9,
        endHour: 10,
        dayOfWeek: 3,
      },
      {
        id: 'Pilates_4_9',
        activityName: 'Pilates',
        startHour: 9,
        endHour: 10,
        dayOfWeek: 4,
      }
    ]
  },
    {
      id: 'Boxeo',
      name: 'Boxeo',
      description: 'El Boxeo es un deporte de contacto en el cual se enfrentan dos individuos que lucharán únicamente con sus puños enfundados en unos guantes especiales con los cuales se golpearán y cuya principal condición será golpear al contrario por encima de la cintura dentro de un cuadrilátero que se encuentra especialmente diseñado para tal fin.',
      imageUrl: '../../../assets/activities/boxing.jpg',
      events: [
        {
          id: 'Boxeo_1_19',
          activityName: 'Pilates',
          startHour: 19,
          endHour: 20,
          dayOfWeek: 1,
        },
        {
          id: 'Boxeo_2_19',
          activityName: 'Pilates',
          startHour: 19,
          endHour: 20,
          dayOfWeek: 2,
        },
        {
          id: 'Boxeo_3_19',
          activityName: 'Pilates',
          startHour: 19,
          endHour: 20,
          dayOfWeek: 3,
        },
        {
          id: 'Boxeo_4_19',
          activityName: 'Pilates',
          startHour: 19,
          endHour: 20,
          dayOfWeek: 4,
        },
      ]
    },
    {
      id: 'Body Combat',
      name: 'Body Combat',
      description: 'Descarga tu adrenalina con esta actividad cardiovascular que utiliza movimientos de artes marciales, como el kick boxing o el taekwondo. Pondrás en funcionamiento todos los grupos musculares y trabajarás la flexibilidad, la fuerza y la resistencia, además de liberar estrés y bajar de peso. ¡Tus puños y piernas no van a parar!',
      imageUrl: '../../../assets/activities/bodycombat.jpg',
      events: []
    },
    {
      id: 'TRX',
      name: 'TRX',
      description: 'Actividad guiada con una duración de 30´. Es un sistema de entrenamiento en suspensión que desarrolla la fuerza funcional al mismo tiempo que se mejora la flexibilidad, el equilibrio, y la estabilidad de la parte central (core) del cuerpo, mejorando cualidades físicas que te exigen cualquier actividad deportiva y en la vida cotidiana, y que está compuesto por una serie de movimientos y ejercicios',
      imageUrl: '../../../assets/activities/trx.jpg',
      events: [],
    }
  ];

  constructor(private router: Router) {}

  getActivities() {
    return this.activities;
  }

  getAllEvents() {
    const result: Activity['events'] = [];
    this.activities.forEach((activity) => {
      activity.events.forEach(event => {
        result.push(event);
      });
    });
    return result;
  }

  getActivityById(id: string): Activity {
    const result: Activity = this.activities.find(activity => {
     return activity.id === id;
    });
    return result;
  }
}
