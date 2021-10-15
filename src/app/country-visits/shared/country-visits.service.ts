import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import CountryVisit from './country-visit.model';

type HttpVerb = 'post' | 'put';

@Injectable({
  providedIn: 'root',
})
export class CountryVisitsService {
  // private fields
  private readonly jsonServerUrl = 'http://localhost:3000/countryVisits';
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  // public methods
  add(visit: CountryVisit) {
    return this.request(visit, 'post', this.jsonServerUrl);
  }

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<CountryVisit[]>(`${this.jsonServerUrl}`);
  }

  remove(id: string) {
    return this.http.delete(`${this.jsonServerUrl}/${id}`);
  }

  update(visit: CountryVisit) {
    return this.request(visit, 'put', `${this.jsonServerUrl}/${visit.id}`);
  }

  // private methods
  private request(visit: CountryVisit, verb: HttpVerb, url: string) {
    return this.http[verb]<CountryVisit>(
      url,
      { ...visit },
      { headers: this.headers }
    );
  }
}
