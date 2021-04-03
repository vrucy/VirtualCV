import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, flatMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean;
  constructor(private httpClient: HttpClient, private route: Router) { }

  login(userName, Password) {
    const adminUser = sessionStorage.setItem('adminUser', userName);

    return this.httpClient.get(`${environment.baseUrl}User/getUser/${userName}/${Password}`).pipe(
      catchError(this.handleError)
    );
  }
  isLogged(): boolean {
    const user = sessionStorage.getItem('adminUser');
    if (user != null) {
      return true;
    } else {
      return false;
    }
  }
  logout() {
    sessionStorage.removeItem('adminUser');
    this.route.navigate(['/home']);
  }
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Bad User name or password`;

    }
    if (errorMessage === null) {
      this.isLoggedIn = true;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
