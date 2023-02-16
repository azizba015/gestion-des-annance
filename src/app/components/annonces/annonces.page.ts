import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'annonces.page.html',
  styleUrls: ['annonces.page.scss'],
})
export class AnnoncePage implements OnInit {
  // dans la page home on va utliser les segments et les slides pour afficher dans chaque slide
  // des differents interfaces comme tout les annonces ou bien les annonces d'utlisateur connecté

  @ViewChild('slides', { static: true }) slider: IonSlides;
  listAnnoncesImmobilier = [];
  listAnnoncesVehicule = [];
  segment = 0;
  userEmail = '';

  constructor(private router: Router) {}
  // cette methode va capturer le changement du segment
  // pour changer le contenu
  async segmentChanged(ev: any) {
    await this.slider.slideTo(this.segment);
  }
  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
    if (this.segment === 0) {
      this.getAnnocesByImmobilier();
    } else {
      this.getAnnocesByVehicules();
    }
  }

  getAnnocesByImmobilier() {
    this.listAnnoncesImmobilier = JSON.parse(
      window.localStorage.getItem('listAnnoncesImmobilier')
    );
    return;
  }
  getAnnocesByVehicules() {
    this.listAnnoncesVehicule = JSON.parse(
      window.localStorage.getItem('listAnnoncesVehicule')
    );
    return;
  }
  ngOnInit() {
    this.userEmail = window.localStorage.getItem('email');
    if (!this.userEmail) return this.router.navigate(['/home']);

    this.getAnnocesByImmobilier();
    this.getAnnocesByVehicules();
  }
  seeDetails(id) {
    this.router.navigate(['/annonce-details', id]);
  }

  SignOut() {
    window.localStorage.removeItem('email');
    this.router.navigate(['/home']);
  }
}
