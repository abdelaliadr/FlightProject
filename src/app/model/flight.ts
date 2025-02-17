export interface Flight {
    flightId: number;          // Corresponds to Long FlightId
    airline: string;           // Airline name
    departureAirport: string;  // IATA code for departure airport (e.g., CDG)
    arrivalAirport: string;    // IATA code for arrival airport (e.g., JFK)
    
    departureCity: string;     // Departure city
    arrivalCity: string;       // Arrival city
  
    departureTime: string;     // Departure date and time
    arrivalTime: string;       // Arrival date and time
  
    price: number;             // Price per passenger
    availableSeats: number;    // Number of available seats
  }