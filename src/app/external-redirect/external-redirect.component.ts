import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-external-redirect',
  template: `<p>Redirecting...</p>`,
})
export class ExternalRedirectComponent implements OnInit {
  ngOnInit() {
    window.location.href = 'http://desktop-qrdpnd5/Reports/powerbi/cause_of_deaths%20dashboard?rs:Embed=true';
  }
}
