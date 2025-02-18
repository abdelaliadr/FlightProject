import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReservationService } from '../service/reservation.service';
import { Reservation } from '../model/Reservation';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  
  reservationForm: FormGroup;
  flightId!: string;
  responseMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private reservationService: ReservationService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.reservationForm = this.fb.group({
      passengerName: ['', Validators.required],
      passengerEmail: ['', [Validators.required, Validators.email]],
      passwordEmail: ['', [Validators.required]],
      seatCount: [1, [Validators.required, Validators.min(1)]],
      passengerCount: [1, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.flightId = this.route.snapshot.paramMap.get('flightId') || '';
  }

  onSubmit(): void {
    if (this.reservationForm.valid) {
      const reservationData = {
        flight: {
          flightId: this.flightId
        },
        passengerName: this.reservationForm.value.passengerName,
        passengerEmail: this.reservationForm.value.passengerEmail,
        passwordEmail: this.reservationForm.value.passwordEmail,
        seatCount: this.reservationForm.value.seatCount,
        passengerCount: this.reservationForm.value.passengerCount
      };

      // Step 1: Create the reservation
      this.reservationService.createReservation(reservationData).subscribe({
        next: (reservation) => {
          // Step 2: Send the ticket
          this.reservationService.sendTicket(reservation).subscribe({
            next: (response) => {
                this.responseMessage = response.message; // Access the message from the JSON response
                this.router.navigate(['/payment', reservation.id]); // Navigate to payment with reservation ID
            },
            error: (err) => {
                console.error("Error sending ticket:", err);
                this.responseMessage = "Reservation created, but there was an error sending the ticket.";
            }
        });
        },
        error: (err) => {
          console.error("Error creating reservation:", err);
          this.responseMessage = err.error || "Error creating reservation. Please try again.";
        }
      });
    }
  }

  cancelReservation(): void {
    this.router.navigate(['/']); // Navigate back to the home page
  }
}

