import { CommonModule, formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FlightService } from '../service/flight.service';
import { Router } from '@angular/router';
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

  ngOnInit(): void {}

  onSubmit(): void {
    const { startLocation, endLocation, startDate, endDate } = this.searchForm.value;

    this.flightService.filterFlights(startLocation, endLocation, startDate, endDate)
      .subscribe({
        next: (response: Flight[]) => {
          this.flights = response;
          this.responseMessage = 'Flights retrieved successfully.';
        },
        error: (error) => {
          this.responseMessage = 'Error retrieving flights.';
          console.error('Error:', error);
        }
      });
  }
}
