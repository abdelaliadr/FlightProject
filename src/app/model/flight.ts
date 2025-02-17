export interface Flight {
  id: number;
  departureCity: string;
  arrivalCity: string;
  departureTime: string;
  arrivalTime: string;
  airline?: string;  // Ajouter si manquant
  price?: number;    // Ajouter si manquant
}
