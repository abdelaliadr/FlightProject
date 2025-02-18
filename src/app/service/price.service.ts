import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  private _flightPrice: number | null = null;

  set flightPrice(price: number | null) {
    this._flightPrice = price;
  }

  get flightPrice(): number | null {
    return this._flightPrice;
}}
