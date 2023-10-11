import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  errorMessage: any;
  successMessage: any;
  showOldPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void { }

  changePassword() {
    if (this.newPassword !== this.confirmPassword) {
        this.errorMessage = 'New Password and Confirm New Password must match.';
        return;
    }

    const changePasswordRequest = {
        email: this.authService.getUserMail(),
        oldPassword: this.oldPassword,
        newPassword: this.newPassword,
        confirmPassword: this.confirmPassword
    };

    this.authService.changePassword(changePasswordRequest).subscribe(
      (response) => {
        if (typeof response === 'string') {
            this.successMessage = response;
            this.errorMessage = null;
            setTimeout(() => {
              this.router.navigate(['/intervention']);
          }, 2000);
        } else {
            this.successMessage = null;
            this.errorMessage = response.message;
        }
    }
    );
}

}
