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

  onSubmit() {
    const formValues = this.searchForm.value;
    this.flightService.filterFlights(
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
