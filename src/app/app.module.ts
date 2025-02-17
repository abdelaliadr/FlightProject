import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MeteoComponent } from './meteo/meteo.component';
import { FormsModule } from '@angular/forms';  // ✅ Fix for ngModel
import { HttpClientModule } from '@angular/common/http';  // ✅ Required for API requests
import { CommonModule } from '@angular/common';  // ✅ Fix for date pipe

@NgModule({
  declarations: [
    AppComponent,
    MeteoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,  // ✅ Add FormsModule here
    HttpClientModule,
    CommonModule  // ✅ Add CommonModule here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
