import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  // private fields
  private readonly jsonServerUrl = 'http://localhost:3000/wishList';

  // public methods
  add(name: string) {
    return this.http.post<{ name: string }>(
      this.jsonServerUrl,
      { id: name },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      }
    );
  }

  constructor(private http: HttpClient) {}
}
