import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Flight } from '../model/flight';
import { FlightRequest } from '../dto/flightRequest';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  private baseUrl = 'http://your-backend-url'; // Replace with your actual backend URL

  constructor(private http: HttpClient) {}

  filterFlights(departureCity: string, arrivalCity: string, departureTime: string, arrivalTime: string): Observable<Flight[]> {
    const params = {
      departureCity,
      arrivalCity,
      departureTime,
      arrivalTime
    };

    return this.http.get<Flight[]>(`${this.baseUrl}/Filter`, { params });
}}
