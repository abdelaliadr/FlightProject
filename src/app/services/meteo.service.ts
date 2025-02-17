import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeteoService {
  private apiUrl = 'http://localhost:8081/api/meteo'; 

  constructor(private http: HttpClient) {}

  getWeatherByCity(city: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${city}`);
  }
}
