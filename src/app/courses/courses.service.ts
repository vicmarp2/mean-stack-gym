import { Injectable } from '@angular/core';
import { Course } from './course.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private courses: Course[] = [
    {
      id: 'Defensa personal',
      name: 'Defensa personal',
      description: 'La defensa personal es un conjunto de habilidades técnico-tácticas encaminadas a impedir o repeler una agresión, realizadas por uno mismo y para sí mismo.\nLas habilidades técnico-tácticas de la defensa personal deben ser eficaces para conseguir el objetivo de evitar o repeler la agresión\nPueden utilizarse todo tipo de recursos disponibles sin más límite que el marcado por la legislación. Resultando, de este modo, una materia multidisciplinar que contiene habilidades de las diversas artes marciales y militares, de los deportes de contacto y lucha, de otros tipos de lucha poco ortodoxas como la pelea callejera, así como de habilidades verbales.',
      imageUrl: '../../assets/courses/self-defense-2.png',
    },
    {
      id: 'Senderismo',
      name: 'Senderismo',
      description: 'El senderismo tiene múltiples beneficios para la salud. Permite quemar calorías porque requiere de un movimiento constante del cuerpo mientras caminamos. Además, favorece la salud cardiovascular y de las articulaciones.\nUn instructor dirigirá la actividad en todo momento y estará a disposición de los caminantes para ayudarles a optimizar su rendimiento. Además, podemos controlar la intensidad del ejercicio eligiendo rutas adaptadas a nuestras condiciones físicas.',
      imageUrl: '../../assets/courses/senderismo.jpg',
    },
    {
      id: 'Running',
      name: 'Running',
      description: 'Tanto si eres un corredor experimentado como si quieres iniciarte en las carreras, tienes un lugar en el Club de Runners.\nLa programación de esta actividad está orientada a la participación en carreras populares. El Club de Runners pone a tu disposición un entrenador que te guiará y asesorará en la práctica de este deporte para que alcances los mejores resultados de forma individual y en grupo.\nAdemás, te mantendremos al día de todas las carreras populares que se organicen en tu ciudad para que puedas adquirir el reto de participar en cualquiera de ellas y superar tus marcas.',
      imageUrl: '../../assets/courses/running.jpg',
    },
    {
      id: 'Padel',
      name: 'Padel',
      description: 'En la actualidad el pádel se ha convertido en una práctica deportiva apta para todos los bolsillos, que permite pasar un rato en compañía de los amigos, ejercitando nuestro cuerpo y mejorando nuestra salud.\nAl tratarse de un deporte que se suele practicar con más de dos personas favorece las relaciones sociales a la vez que practicamos deporte, nos ponernos en forma y eliminamos tensiones y estrés diario.\nHemos diseñado una metodología para lograr una mejor asimilación por parte de los alumnos gracias a la combinación de diferentes técnicas de trabajo con ejercicios de aplicación y juegos para aprender las reglas más importantes.\nLas clases se organizan según el nivel de los alumnos, con varias repeticiones y variando el ritmo de trabajo.',
      imageUrl: '../../assets/courses/padel.jpg',
    }
  ];

  constructor() { }

  getCourses() {
    return [...this.courses];
  }
}
