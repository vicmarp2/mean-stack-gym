import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.css']
})
export class FacilitiesComponent implements OnInit {

  facilitiesCards: Array<{facilitieName: string,
    pictureUrl: string, description: string,
    shortDesc: string }>;

  constructor() { }

  ngOnInit() {
    this.facilitiesCards = [
      {
        facilitieName: 'Maquinaria cardio',
        pictureUrl: '../../../assets/facilities/cardio.jpg',
        description: 'Dispondrás de una zona de entrenamiento cardiovascular, con equipamiento de última generación. Más de 70 equipos de cardio, cintas de correr, elípticas, steps, remos, bicicletas de diferentes tipos, incluso para personas que padezcan lesiones de espalda o tren inferior. Además, tendrás la posibilidad de ver tu programa favorito de tv mientras entrenas, escuchar tu música conectando tu ipod a las máquinas, etc. Conocerás una manera más amena y divertida de entrenar.',
        shortDesc: 'Quema todas las calorias que puedas',
      },
      {
        facilitieName: 'Maquinaria de fuerza',
        pictureUrl: '../../../assets/facilities/material_fuerza.jpg',
        description: 'Esta zona está diseñada para que puedas llevar a cabo tus entrenamientos de fuerza, independientemente del nivel que tengas. Un circuito de iniciación y entrenamiento rápido, pensado para que entrenes todo tu cuerpo de manera segura y rápida, sin tener que pensar en los ejercicios. Dispondrás también de un buen número de máquinas para no tener que esperar. Equipos de poleas, de carga de discos, máquinas isotónicas, preparadas para llevar a cabo entrenamientos de todo tipo, fitness, entrenamiento deportivo y alta competición.',
        shortDesc: 'Hazte la versión más fuerte de tí mismo',
      },
      {
        facilitieName: 'Peso libre',
        pictureUrl: '../../../assets/facilities/mancuernas.jpg',
        description: 'Más de 150 m2 de zona de entrenamiento, pensada para que puedas entrenar con libertad y con todo tipo de equipamiento. Máquinas con carga de discos, poleas, barras, un gran número de mancuernas y bancos para que no esperes. Muchos deportistas se deciden por nuestras instalaciones por la cantidad y variedad de equipamiento que hay a disposición.',
        shortDesc: 'Ejercita hasta el último músculo',
      },
      {
        facilitieName: 'Material funcional',
        pictureUrl: '../../../assets/facilities/material_funcional.jpg',
        description: 'Esta zona está pensada para llevar a cabo los sistemas de entrenamiento más innovadores y efectivos. Los diferentes materiales y equipos, te permitirán trabajar con nuestros entrenadores y lograr tus objetivos de manera más rápida.\nLos materiales utilizados en el entrenamiento funcional son: cintas TRX, tablas de equilibrio, kettlebells (pesas rusas), balones medicinales, bosu, ejercicios con el peso corporal, entre otros.',
        shortDesc: 'Prepara tu cuerpo para los retos del día a día',
      },

    ];
  }

}
