import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit {
    user: any = {};
    roleName: string = '';
    roles: any[] = [];
    errorMessage: string = '';
    successMessage: string = '';
  
    constructor(private http: HttpClient, private router: Router) {}
  
    ngOnInit() {
      this.fetchRoles();
      
    }
  
    fetchRoles() {
      this.http.get<any[]>(`${environment.backendUrl}/users/getAllRoles`).subscribe(
        (response) => {
          this.roles = response;
        },
        (error) => {
          console.error('Error fetching roles:', error);
        }
      );
    }

    arePasswordsMatch(): boolean {
      return this.user.password === this.user.confirmPassword;
    }

    isValidPassword(): boolean {
      const password = this.user.password;
      if (!password) {
        return false;
      }
    
      const uppercaseRegex = /[A-Z]/;
      const lowercaseRegex = /[a-z]/;
      const specialCharRegex = /[^A-Za-z0-9]/;
    
      const hasUppercase = uppercaseRegex.test(password);
      const hasLowercase = lowercaseRegex.test(password);
      const hasSpecialChar = specialCharRegex.test(password);
    
      return hasUppercase && hasLowercase && hasSpecialChar;
    }
    
    
  
    subscribeUser() {
      if (!this.arePasswordsMatch()) {
        console.error('Passwords do not match.');
        return;
      }
  
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      
      const requestBody = {
        user: {
          email: this.user.email.toLowerCase(),
          password: this.user.password,
          name: this.user.name,
          firstname: this.user.firstname,
          techCode: this.user.techCode,
          address: this.user.address,
          phoneNumber: this.user.phoneNumber,
        },
        roleName: this.roleName,
      };
  
      this.http.post(`${environment.backendUrl}/subscribe`, requestBody, { headers }).subscribe(
        (response) => {
          this.successMessage = "User created";
          console.log('User subscribed successfully:', response);
    
        },
        (error) => {
          console.error('Error subscribing user:', error);
          this.errorMessage = "Subscription impossible, Either user already exists or you entered wrong info";
        }
      );
    }

    ngAfterViewInit(): void {
      this.initModal();
      console.log('ngAfterViewInit appelé');
    }
  
    initModal(): void {
      $('#successModal').modal({
        backdrop: 'static',
        keyboard: false
      });
    }
  
    showSuccessModal(): void {
      $('#successModal').modal('show');
    }
  
    /*redirectToLogin(): void {
      this.router.navigate(['/login']); // Remplacez '/login' par le chemin de votre page de login
    }*/
  
    redirectToLogin(): void {
      $('#successModal').modal('hide');
      $('#successModal').on('hidden.bs.modal', () => {
          this.router.navigate(['/login']);
      });
  
  }
}
