export interface Reservation {
    id?: number;
    flightId: number;
    passengerName: string;
    passengerEmail: string;
    passengerCount: number;
    seatCount: number;
    totalPrice?: number;
    confirmed?: boolean;
  }
  