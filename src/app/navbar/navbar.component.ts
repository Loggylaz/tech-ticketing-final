import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  firstNameUser: String ='';
  nameUser: String ='';
  roleUser: String = '';
  isLoggedIn:  any;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.firstNameUser = this.auth.getFirstNameUser();
    this.nameUser = this.auth.getNameUser();
    this.roleUser = this.auth.getRole();
    this.isLoggedIn = this.auth.isLoggedIn();
  }

  logout() {
    this.auth.logout();
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
