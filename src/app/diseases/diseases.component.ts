import { Component, OnInit } from '@angular/core';
import { PowerBiService } from '../service/powerbi.service';
import { NgIf, DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-diseases',
  templateUrl: './diseases.component.html',
  styleUrls: ['./diseases.component.css']
})
export class DiseasesComponent implements OnInit {
  reportUrl: string = '';

  constructor(private powerBiService: PowerBiService) {}

  ngOnInit() {
    this.loadReport('cause_of_deaths dashboard');  // Passing the report name with a space
  }

  loadReport(reportName: string) {
    // URL-encode the reportName before making the request
    const encodedReportName = encodeURIComponent(reportName);
    this.powerBiService.getReportUrl(encodedReportName).subscribe(url => {
      this.reportUrl = url;
      console.log('Power BI Report URL:', this.reportUrl);  // Optional for debugging
    });
  }
}
