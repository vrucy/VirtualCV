import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Client } from '../../Models/Client';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private httpClient: HttpClient) { }

  currentClient: Client;
  answerClient;
  selectedClient: any;

  postClient(client) {
    return this.httpClient.post(`${environment.baseUrl}Clients` , client );
  }

  getClientId() {
    return this.httpClient.get(`${environment.baseUrl}Clients/GetClientId`);
  }

  getClientForPosition(idPosition): Observable<Client[]> {
    return this.httpClient.get<Client[]>(`${environment.baseUrl}Clients/GetClientForPosition/` + idPosition);
  }
  getAllClients(): Observable<Client[]> {
    return this.httpClient.get<Client[]>(`${environment.baseUrl}Clients`);
  }
}
