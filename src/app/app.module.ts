import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MeteoComponent } from './meteo/meteo.component';
import { DiseasesComponent } from './diseases/diseases.component';
import { SafePipe } from './pipes/safe.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  
import { HttpClientModule } from '@angular/common/http';  
import { CommonModule } from '@angular/common'; 
import { ExternalRedirectComponent } from './external-redirect/external-redirect.component';

@NgModule({
  declarations: [
    AppComponent,
    MeteoComponent,
    DiseasesComponent,
    SafePipe,
    ExternalRedirectComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
