import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthGuardService } from '../services/auth-guard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;
  errorMessage: string = '';
  private authTokenKey = 'authToken';
  jwtToken: any;
  showPassword = false;
  roleToken:any;

  constructor(private auth: AuthService, private router: Router, private formBuilder: FormBuilder, private authGuard: AuthGuardService) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    
  }

  ngOnInit() {
    if(this.auth.isLoggedIn()){
      this.router.navigate(['/intervention']);
    }
  }


  login() {
    this.auth.login(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value)
      .subscribe(
        success => {
          console.log(success);

          this.auth.checkChangePassword().subscribe(mustChangePassword => {
            console.log("test sans toString: ", mustChangePassword)
            console.log("test avec toString: ", mustChangePassword.toString())
            if (mustChangePassword.toString() === "true") {
              this.router.navigate(['/change-password']);
            } else {
              this.router.navigate(['/intervention']);
            }
          });
        },
        error => {
          console.log(error);
          this.errorMessage = 'Invalid username or password';
        }
      );
  }
}
