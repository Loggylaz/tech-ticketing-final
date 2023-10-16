import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

interface LoginResponse {
  token: string;
  role: string;
  idUser: any;
  firstNameUser: string;
  nameUser: string;
  userMail: string; 
  mustChangePassword: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly ROLE = 'ROLE';
  private readonly IDUSER = 'IDUSER';
  private readonly FIRSTNAMEUSER = 'FIRSTNAMEUSER';
  private readonly NAMEUSER = 'NAMEUSER';
  private readonly USERMAIL = 'USERMAIL';
  private readonly MUSTCHANGEPASSWORD = 'MUSTCHANGEPASSWORD';

  public userLoggedIn = false;

  loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem(this.JWT_TOKEN);
    if (token) {
      this.userLoggedIn = true;
      this.loggedIn.next(true);
    }
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) {
      return true;
    }

    try {
      const decodedToken: any = jwt_decode(token);
      const currentTime = Date.now() / 1000;

      return decodedToken.exp < currentTime;
    } catch (error) {
      return true;
    }
  }

  logout(): void{
    this.loggedIn.next(false);

    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.ROLE);
    localStorage.removeItem(this.IDUSER);
    localStorage.removeItem(this.FIRSTNAMEUSER);
    localStorage.removeItem(this.NAMEUSER);
    localStorage.removeItem(this.USERMAIL);
    localStorage.removeItem(this.MUSTCHANGEPASSWORD);
    this.userLoggedIn = false;
    this.router.navigate(['/login']);
  }

  private storeTokens(res: LoginResponse) {
    localStorage.setItem(this.JWT_TOKEN, res.token);
    localStorage.setItem(this.ROLE, res.role);
    localStorage.setItem(this.IDUSER, res.idUser);
    localStorage.setItem(this.FIRSTNAMEUSER, res.firstNameUser);
    localStorage.setItem(this.NAMEUSER, res.nameUser);
    localStorage.setItem(this.USERMAIL, res.userMail);
    localStorage.setItem(this.MUSTCHANGEPASSWORD, res.mustChangePassword);
  }



  getRole() {
    const token = localStorage.getItem(this.JWT_TOKEN);
    if (token) {
      const decodedToken: any = jwt_decode(token);
      if (decodedToken && decodedToken.role) {
        return decodedToken.role;
      }
    }
    return null;
  }
  
  getIdUser() {
    const token = localStorage.getItem(this.JWT_TOKEN);
    if (token) {
      const decodedToken: any = jwt_decode(token);
      if (decodedToken && decodedToken.idUser) {
        return decodedToken.idUser;
      }
    }
    return null;
  }

  getFirstNameUser() {
    const token = localStorage.getItem(this.JWT_TOKEN);
    if (token) {
      const decodedToken: any = jwt_decode(token);
      if (decodedToken && decodedToken.firstNameUser) {
        return decodedToken.firstNameUser;
      }
    }
    return null;
  }

  getNameUser() {
    const token = localStorage.getItem(this.JWT_TOKEN);
    if (token) {
      const decodedToken: any = jwt_decode(token);
      if (decodedToken && decodedToken.nameUser) {
        return decodedToken.nameUser;
      }
    }
    return null;
  }

  getMustChangePassword() {
    const token = localStorage.getItem(this.JWT_TOKEN);
    if (token) {
      const decodedToken: any = jwt_decode(token);
      if (decodedToken && decodedToken.mustChangePassword) {
        return decodedToken.mustChangePassword;
      }
    }
    return null;
  }

  getUserMail() {
    const token = localStorage.getItem(this.JWT_TOKEN);
    if (token) {
      const decodedToken: any = jwt_decode(token);
      if (decodedToken && decodedToken.userMail) {
        return decodedToken.userMail;
      }
    }
    return null;
  }

  getToken() {
    const token = localStorage.getItem(this.JWT_TOKEN);
    return token;
  }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.backendUrl}/auth/login`, {username, password}).pipe(
      tap((res: LoginResponse) => this.doLoginUser(res)),
      catchError(error => {
        console.error(error);
        throw error;
      })
    );
  }

  changePassword(changePasswordRequest: any): Observable<any> {
    return this.http.put(`${environment.backendUrl}/users/changePassword`, changePasswordRequest, { responseType: 'text' }).pipe(
        catchError((error) => {
            if (error.status === 400) {
                return throwError('Failed to change password. Please check your old password.');
            }
            return throwError(error);
        })
    );
}

checkChangePassword(): Observable<boolean> {
  return this.http.get<boolean>(`${environment.backendUrl}/users/checkChangePassword`);
}

  private doLoginUser(res: LoginResponse) {
    this.storeTokens(res);
    this.loggedIn.next(true);
  }

  isLoggedIn(): boolean {
    return this.loggedIn.value;
  }
}
