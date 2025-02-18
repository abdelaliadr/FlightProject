import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PowerBiService {
  private apiUrl = 'http://localhost:8081/api/powerbi/report';

  constructor(private http: HttpClient) {}

  getReportUrl(reportName: string): Observable<string> {
    return this.http.get(this.apiUrl + '?reportName=' + reportName, { responseType: 'text' });
  }
}
