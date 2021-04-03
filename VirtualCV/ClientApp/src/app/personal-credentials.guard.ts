import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ClientService } from './services/client-service.service';

@Injectable({
  providedIn: 'root'
})
export class PersonalCredentialsGuard implements CanActivate {
  constructor(private clientService: ClientService, private route: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {
      if ( this.clientService.currentClient) {
        return true;
      } else {
        this.route.navigate(['personalCredentials']);
        return false;
      }
  }
}
