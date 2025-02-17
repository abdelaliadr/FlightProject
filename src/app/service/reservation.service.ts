import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from '../model/Reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl = 'https://localhost/api/reservations'; // Mettez l'URL correcte de votre API

  constructor(private http: HttpClient) { }

  reserveFlight(reservation: Reservation): Observable<any> {
    return this.http.post<any>(this.apiUrl, reservation);
  }
}
