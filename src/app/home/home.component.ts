import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('slideshow') slideShow: any;

  carouselSource = [
    '../../assets/home/carousel/woman-exercising-in-gym.jpeg',
    '../../assets/home/carousel/luchador_abs_recortada.jpg',
    // '../../assets/home/carousel/rack_pensativo.jpg',
    // '../../assets/home/carousel/salto_comba_recortada.jpg',
    '../../assets/home/carousel/pesomuerto_barra.jpg',
  ];

  constructor(private router: Router) {
   }

  ngOnInit() {
  }

  onClick(event: Event) {
    // index of the image clicked
    switch (this.slideShow.slideIndex) {
      case 0: this.router.navigate(['/quotas']); break;
      case 1: this.router.navigate(['/activities/at/any']); break;
      case 2: this.router.navigate(['/tryfree']);
    }
    console.log(this.slideShow.slideIndex);
  }
}
