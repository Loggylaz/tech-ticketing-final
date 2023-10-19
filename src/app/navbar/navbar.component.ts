import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { BurgerMenuComponent } from '../burger-menu/burger-menu.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  firstNameUser: String = '';
  nameUser: String = '';
  roleUser: any;
  isLoggedIn: any;

  @ViewChild(BurgerMenuComponent)
  private burgerMenu!: BurgerMenuComponent;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.firstNameUser = this.auth.getFirstNameUser();
    this.nameUser = this.auth.getNameUser();
    this.roleUser = this.auth.getRole();
    this.isLoggedIn = this.auth.isLoggedIn();

    // Pass the roleUser to the burger menu
    this.burgerMenu.roleUser = this.roleUser;
  }

  toggleNavbar() {
    this.burgerMenu.toggleMenu();
  }

  logout() {
    this.auth.logout();
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
