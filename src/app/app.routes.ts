import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { SignupComponent } from './signup/signup.component';
import { BookingComponent } from './booking/booking.component';
import { Home1Component } from './home1/home1.component';
import { MeteoComponent } from './meteo/meteo.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home1',
    component: Home1Component,
  },
  {
    path: 'meteo',
    component: MeteoComponent,
  },
  {
    path: 'search',
    component: SearchComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: 'profile',
    component: BookingComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Configure the routes
  exports: [RouterModule],  // Export the router module
})
export class AppRoutingModule {}
