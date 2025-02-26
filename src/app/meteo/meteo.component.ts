import { Component } from '@angular/core';
import { NgIf, DatePipe } from '@angular/common';  // ✅ Import DatePipe and NgIf
import { FormsModule } from '@angular/forms';  // ✅ Import FormsModule for ngModel
import { HttpClient, HttpClientModule } from '@angular/common/http';  // ✅ Required for API calls

@Component({
  selector: 'app-meteo',
  standalone: true,
  templateUrl: './meteo.component.html',
  styleUrls: ['./meteo.component.css'],
  imports: [NgIf, FormsModule, DatePipe, HttpClientModule]  // ✅ Add required modules
})
export class MeteoComponent {
  city: string = '';
  weather: any = null;
  weatherIcon: string = '';  // ✅ Define weatherIcon

  constructor(private http: HttpClient) {}  // ✅ Inject HttpClient

  fetchWeather() {
    if (!this.city) {
      alert("Please enter a city name");
      return;
    }

    const apiUrl = `http://localhost:8089/api/meteo/${this.city}`;
    
    this.http.get(apiUrl).subscribe({
      next: (response: any) => {
        this.weather = response;  // ✅ Assign response to weather object

        // ✅ Extract the weather icon code
        const iconCode = response.description ? this.getWeatherIconCode(response.description) : '01d';
        this.weatherIcon = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      },
      error: (error) => {
        console.error('Error fetching weather:', error);
        alert('Failed to fetch weather data');
      }
    });
  }

  // ✅ Function to map description to OpenWeatherMap icons
  private getWeatherIconCode(description: string): string {
    const weatherMap: { [key: string]: string } = {
      'clear sky': '01d',
      'few clouds': '02d',
      'scattered clouds': '03d',
      'broken clouds': '04d',
      'shower rain': '09d',
      'rain': '10d',
      'thunderstorm': '11d',
      'snow': '13d',
      'mist': '50d'
    };

    return weatherMap[description] || '01d';  // Default to 'clear sky' if not found
  }
}
