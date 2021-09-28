import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from './country.model';

@Injectable({
  providedIn: 'root',
})
export class RestCountriesService {
  // private properties
  private readonly baseUrl = 'https://restcountries.com/v3.1/';

  // public methods
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Country[]>(`${this.baseUrl}/all/`);
  }
}
