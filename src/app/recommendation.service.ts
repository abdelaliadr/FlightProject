import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {
  private apiUrl = 'http://localhost:5000/recommander'; // URL de votre API

  constructor() { }

  async recommend(budget: number) {
    try {
      const response = await axios.post(this.apiUrl, { budget });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la recommandation:', error);
      throw error;
    }
  }
}
