import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-annonce',
  templateUrl: './add-annonce.page.html',
  styleUrls: ['./add-annonce.page.scss'],
})
export class AddAnnoncePage implements OnInit {
  annonce: any;
  userEmail: string;
  constructor(private router: Router) {}

  ngOnInit() {
    this.userEmail = window.localStorage.getItem('email');
  }
  addAnnonce(formValue: any) {
    //get Storage User.username

    this.annonce = { createdBy: this.userEmail, ...formValue };

    if (this.annonce.category === 'Vehicule') {
      const listAnnoncesVehicule =
        JSON.parse(window.localStorage.getItem('listAnnoncesVehicule')) || [];

      listAnnoncesVehicule.push({
        id: listAnnoncesVehicule.length
          ? (
              parseInt(
                listAnnoncesVehicule[listAnnoncesVehicule.length - 1].id
              ) + 1
            ).toString()
          : '1',
        ...this.annonce,
      });

      window.localStorage.setItem(
        'listAnnoncesVehicule',
        JSON.stringify(listAnnoncesVehicule)
      );
    } else {
      const listAnnoncesImmobilier =
        JSON.parse(window.localStorage.getItem('listAnnoncesImmobilier')) || [];

      listAnnoncesImmobilier.push({
        id: listAnnoncesImmobilier.length
          ? (
              parseInt(
                listAnnoncesImmobilier[listAnnoncesImmobilier.length - 1].id
              ) + 1
            ).toString()
          : '1',
        ...this.annonce,
      });

      window.localStorage.setItem(
        'listAnnoncesImmobilier',
        JSON.stringify(listAnnoncesImmobilier)
      );
    }
  }
}
