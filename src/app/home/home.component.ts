import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FlightService } from '../service/flight.service';

import { Flight } from '../model/flight';

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

  constructor(private fb: FormBuilder, private flightService: FlightService) {
    this.searchForm = this.fb.group({
      startLocation: [''],
      endLocation: [''],
      startDate: [''],
      endDate: ['']
    });
  }

  onSubmit(): void {
    const { startLocation, endLocation, startDate, endDate } = this.searchForm.value;

    if (!startLocation || !endLocation || !startDate || !endDate) {
      this.responseMessage = 'Please fill in all fields';
      return;
    }

    this.flightService.filterFlights(startLocation, endLocation, startDate, endDate)
      .subscribe({
        next: (response: Flight[]) => {
          this.flights = response;
          this.responseMessage = this.flights.length ? 'Flights found:' : 'No flights available.';
        },
        error: (error) => {
          this.responseMessage = 'Error retrieving flights.';
          console.error('Error:', error);
        }
      });
  }
}
