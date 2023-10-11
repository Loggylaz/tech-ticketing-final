import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private auth: AuthService, private router: Router) { }
  title = 'TechTicketingFinal';
  private userLoggedIn = false;

  isUserLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  ngOnInit() {

  }

  login() {
    this.userLoggedIn = true;
  }

  logout() {
    this.userLoggedIn = false;
  }
}
