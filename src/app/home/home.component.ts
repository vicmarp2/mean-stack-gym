import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('slideshow') slideShow: any;

  carouselSource = [
    '../../assets/home/carousel/woman-exercising-in-gym.jpeg',
    '../../assets/home/carousel/luchador_abs_recortada_+.jpg',
    // '../../assets/home/carousel/rack_pensativo.jpg',
    // '../../assets/home/carousel/salto_comba_recortada.jpg',
    '../../assets/home/carousel/pesomuerto_barra.jpg',
  ];

  constructor() {
   }

  ngOnInit() {
  }

  onClick(event: Event) {
    // index of the image clicked
    console.log(this.slideShow.slideIndex);
  }
}
