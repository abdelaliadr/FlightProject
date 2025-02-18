import { Component } from '@angular/core';
import { RecommendationService } from '../service/recommendation.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-recommandation',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './recommandation.component.html',
  styleUrl: './recommandation.component.css'
})
export class RecommandationComponent {
  budget: number | null = null;
  recommendation: string | null = null;
  errorMessage: string = '';

  constructor(private recommendationService: RecommendationService) {}

  onSubmit(): void {
    if (this.budget) {
      this.recommendationService.getRecommendation(this.budget).subscribe(
        (response) => {
          this.recommendation = `Recommended City: ${response.ville}, Duration: ${response.durée} days, Category: ${response.catégorie}`;
          this.errorMessage = '';
        },
        (error) => {
          this.errorMessage = 'An error occurred while fetching recommendations.';
          console.error('Error:', error);
        }
      );
    } else {
      this.errorMessage = 'Please enter a valid budget.';
    }
  }
}