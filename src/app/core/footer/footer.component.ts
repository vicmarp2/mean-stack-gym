import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  footerLinks = [
    {
      title: 'CONTACTO',
      link: ''
    },
    {
      title: 'QUIÉNES SOMOS',
      link: ''
    },
    {
      title: 'TRABAJA CON NOSOTROS',
      link: ''
    },
    {
      title: 'INFORMACIÓN LEGAL',
      link: ''
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
