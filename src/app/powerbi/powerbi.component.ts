import { Component, OnInit } from '@angular/core';
import { PowerBiService } from '../service/powerbi.service';

@Component({
  selector: 'app-powerbi',
  templateUrl: './powerbi.component.html',
  styleUrls: ['./powerbi.component.css']
})
export class PowerbiComponent implements OnInit {
  reportUrl: string = '';

  constructor(private powerBiService: PowerBiService) {}

  ngOnInit() {
    this.loadReport('cause_of_deaths%20dashboard');
  }

  loadReport(reportName: string) {
    this.powerBiService.getReportUrl(reportName).subscribe(url => {
      this.reportUrl = url;
    });
  }
}
