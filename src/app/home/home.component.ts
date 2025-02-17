import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FlightService } from '../service/flight.service';

import { Flight } from '../model/flight';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  searchForm: FormGroup;
  flights: Flight[] = [];
  responseMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private flightService: FlightService,
    private router: Router  // Inject Router service
  ) {
    this.searchForm = this.fb.group({
      flightId: [''],
      startLocation: [''],
      endLocation: [''],
      startDate: [''],
      endDate: ['']
    });
  }

  // Function to handle flight booking navigation
  navigateToReservation(flightId: string) {
    this.router.navigate(['/reserve', flightId]);  // Navigate to the reservation page with flightId
  }

  onSubmit() {
    const formValues = this.searchForm.value;
    this.flightService.filterFlights(
      formValues.flightId,
      formValues.startLocation, 
      formValues.endLocation, 
      formValues.startDate, 
      formValues.endDate
    ).subscribe(
      (data) => {
        this.flights = data;
        console.log("Received flights:", this.flights); // Debugging the data
        if (this.flights.length === 0) {
          this.responseMessage = "No flights available";
        } else {
          this.responseMessage = "";
        }
      },
      (error) => {
        console.error("Error retrieving flights:", error);
        this.responseMessage = "Error retrieving flights";
      }
    );
  }
}
