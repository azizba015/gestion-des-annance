import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}
  loginauth(value) {
    if (value.email === value.password) {
      window.localStorage.setItem('email', value.email);
      this.router.navigate(['/annonces']);
    } else window.alert('Invalid');
  }
}
