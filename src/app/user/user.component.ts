import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userId: string;
  user = {
    userId: '',
    quota: {
      title: 'Cuota 3 meses',
      numberOfPayments: 3,
      pricePerMonth: 20,
      periodInMonths: 3,
      isCardNeeded: true,
      cardPrice: 10,
    },
    dni: '53607620W',
    purchaseDate: new Date(2019, 1, 1),
    endDate: new Date(2019, 4, 1),
    name: 'Víctor',
    surname: 'Martínez Palomares',
    email: 'correo.vmp@gmail.com',
    contactNumber: '638903401',
    birthdate: new Date(),
    address: 'Plaza America, 5 3',
    postalCode: '46900',
    city: 'Torrent, Valencia',
    iban: '5353453453',
  };
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // se obtiene el gimnasio de la ruta
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        of(params.get('userId'))
      )
    ).subscribe((userId: string) => {
      if (userId) {
        this.user.userId = userId;
      }
    });
  }

}
