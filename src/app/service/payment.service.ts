import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = 'http://localhost:8082/api/payments'; // Adjust the base URL as necessary

  constructor(private http: HttpClient) {}

  createPayment(paymentRequest: any, reservationId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}?reservationId=${reservationId}`, paymentRequest);
}
}