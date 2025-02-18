import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Reservation } from '../model/Reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl = 'http://localhost:8081/api/reservations'; // Mettez l'URL correcte de votre API
  private baseUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) { }

  reserveFlight(reservation: Reservation): Observable<any> {
    return this.http.post<any>(this.apiUrl, reservation);
  }

  createReservation(reservationData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reserve`, reservationData).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError('Something went wrong; please try again later.');
  };
  
  sendTicket(reservation: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/sendTicket`, reservation);
  }
  }
