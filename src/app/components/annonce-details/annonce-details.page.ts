import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-annonce-details',
  templateUrl: './annonce-details.page.html',
  styleUrls: ['./annonce-details.page.scss'],
})
export class AnnonceDetailsPage implements OnInit {
  id: any;
  annonce: any;
  userEmail: string;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}
  // eslint-disable-next-line max-len
  //charger l'email a partir du local Storage pour utliser ulterieurement (afficher le boutton supprimer si l'utlisateur est le createur de annonce)
  // recuperer l'id de l'annonce puis le charger a partir de firebase
  ngOnInit() {
    this.userEmail = localStorage.getItem('email');
    if (!this.userEmail) return this.router.navigate(['/home']);

    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    const listAnnoncesVehicule =
      JSON.parse(window.localStorage.getItem('listAnnoncesVehicule')) || [];
    const listAnnoncesImmobilier =
      JSON.parse(window.localStorage.getItem('listAnnoncesImmobilier')) || [];

    this.annonce = [...listAnnoncesVehicule, ...listAnnoncesImmobilier].find(
      (e) => e.id === this.id
    );
  }
  // supprimer l'annonce
  deleteAnnonce() {
    if (this.annonce.category === 'Vehicule') {
      const listAnnoncesVehicule =
        JSON.parse(window.localStorage.getItem('listAnnoncesVehicule')) || [];
      const index = listAnnoncesVehicule.findIndex((e) => e.id === this.id);
      listAnnoncesVehicule.splice(index, 1);
      window.localStorage.setItem(
        'listAnnoncesVehicule',
        JSON.stringify(listAnnoncesVehicule)
      );
    } else {
      const listAnnoncesImmobilier =
        JSON.parse(window.localStorage.getItem('listAnnoncesImmobilier')) || [];
      const index = listAnnoncesImmobilier.findIndex((e) => e.id === this.id);
      listAnnoncesImmobilier.splice(index, 1);
      window.localStorage.setItem(
        'listAnnoncesImmobilier',
        JSON.stringify(listAnnoncesImmobilier)
      );
    }
    if (!this.userEmail) return this.router.navigate(['/annonces']);
  }
  // backButton() {
  //   console.log('backButton');
  //   this.router.navigate(['/annonces']);
  // }
}
