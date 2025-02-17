import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Flight } from '../model/flight';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private apiUrl = 'http://localhost:8081/api/flights/filter'; // URL to call Spring API

  constructor(private http: HttpClient) {}

  filterFlights(
    departureCity: string,
    arrivalCity: string,
    departureTime: string,
    arrivalTime: string
  ): Observable<Flight[]> {
    return this.http.get<Flight[]>(`${this.apiUrl}`, {
      params: {
        departureCity,
        arrivalCity,
        departureTime,
        arrivalTime
      }
    });
  }
}
