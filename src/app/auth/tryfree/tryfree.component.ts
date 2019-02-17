import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tryfree',
  templateUrl: './tryfree.component.html',
  styleUrls: ['./tryfree.component.css']
})
export class TryfreeComponent implements OnInit {

  constructor(private snackBar: MatSnackBar, private route: Router) {}

  ngOnInit() {
  }

  onTryfree(form: NgForm) {
    if (form.invalid) {

      return;
    }
    console.log(form.value.DNI);
    this.snackBar.open(`Gracias ${form.value.name}. La petición ha sido enviada con éxito`, '', {
      duration: 1000,
    });
    this.route.navigate(['/']);
  }
}
