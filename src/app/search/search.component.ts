import { Component, OnInit } from '@angular/core';
import { FlightService } from '../service/flight.service';
import { CommonModule, JsonPipe } from '@angular/common';
import { Flight } from '../model/flight';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { FlightRequest } from '../dto/flightRequest';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../service/customer.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  constructor(
    private flightService: FlightService,
    private customerService: CustomerService,
    private route: ActivatedRoute
  ) {}

  searchData: FlightRequest | undefined = undefined;

  flights: Flight[] = [];

  failed = false;

  ngOnInit(): void {
    
}}
