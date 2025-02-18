import { HttpClient } from '@angular/common/http';
import { Component, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentService } from '../service/payment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';
import { FlightService } from '../service/flight.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment.prod';
import { PriceService } from '../service/price.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  paymentRequest = {
    currency: 'usd', // Default currency
    source: '',
    cardHolderName: ''
  };
  reservationId!: number;
  flightId: string | null = null; // To store flightId
  flightPrice: number | null = null; // To store flight price
  responseMessage: string = '';

  constructor(
    private paymentService: PaymentService,
    private flightService: FlightService,
    private route: ActivatedRoute,
    private router: Router,
    private priceService: PriceService,
  ) {}

  ngOnInit(): void {
    this.reservationId = +this.route.snapshot.paramMap.get('reservationId')!;
    // Retrieve flightId from route parameters
    this.flightId = this.route.snapshot.paramMap.get('flightId');
    console.log('Flight ID:', this.flightId); // Debugging line

    if (this.flightId) {
      this.fetchFlightDetails(this.flightId); // Fetch flight details
    }
  }

  fetchFlightDetails(flightId: string): void {
  this.flightService.getFlightById(flightId).subscribe(
    (data) => {
      if (data && data.price !== undefined) {
        this.flightPrice = data.price; // Ensure price exists
        this.priceService.flightPrice = this.flightPrice; // Store price in the service
        console.log('Flight Price stored in service:', this.priceService.flightPrice);
      }
    },
    (error) => {
      console.error('Error fetching flight details:', error);
    }
  );
}

  onSubmit(): void {
    this.paymentService.createPayment(this.paymentRequest, this.reservationId).subscribe({
      next: (response) => {
        this.responseMessage = response; // Assuming the response is a success message
        // Optionally, navigate to a confirmation page or home
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error("Payment error:", error);
        this.responseMessage = "Payment failed: " + error.error;
      }
    });
  }
  }

