import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../service/reservation.service';
import { Reservation } from '../model/Reservation';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  
  flightId!: number;
  reservationForm: FormGroup;
  responseMessage: string = '';
  loading: boolean = false; // To show loading state
  router: any;

  constructor(
    private route: ActivatedRoute, 
    private fb: FormBuilder, 
    private reservationService: ReservationService
  ) {
    this.reservationForm = this.fb.group({
      passengerName: ['', Validators.required],
      passengerEmail: ['', [Validators.required, Validators.email]],
      passengerCount: [1, [Validators.required, Validators.min(1)]],
      seatCount: [1, [Validators.required, Validators.min(1)]]
    });
  }


  ngOnInit(): void {
    // Get flight ID from URL and handle if it's not present
    const flightIdParam = this.route.snapshot.paramMap.get('flightId');
    if (flightIdParam) {
      this.flightId = Number(flightIdParam);
    } else {
      this.responseMessage = "No Flight ID found in URL!";
    }
  }

  onSubmit() {
    if (!this.flightId) {
      this.responseMessage = "Flight ID is missing!";
      return;
    }
  
    if (this.reservationForm.invalid) {
      this.responseMessage = "Please fill in all required fields correctly.";
      return;
    }
  
    const reservation: Reservation = {
      flightId: this.flightId,
      passengerName: this.reservationForm.value.passengerName,
      passengerEmail: this.reservationForm.value.passengerEmail,
      passengerCount: this.reservationForm.value.passengerCount,
      seatCount: this.reservationForm.value.seatCount
    };
  
    this.loading = true; // Start loading state
  
    this.reservationService.reserveFlight(reservation).subscribe({
      next: (response:any) => {
        this.loading = false; // End loading state
        this.responseMessage = `Reservation successful! Total Price: $${response.totalPrice}`;
        this.reservationForm.reset(); // Reset form on success
      },
      error: (error: any) => {
        this.loading = false; // End loading state
        console.error("Error during reservation:", error);
        this.responseMessage = `Reservation failed: ${error.message || 'Please try again later.'}`;
      }
    });
  }
  
}

