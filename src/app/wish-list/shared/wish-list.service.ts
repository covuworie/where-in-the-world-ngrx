import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  // private fields
  private readonly jsonServerUrl = 'http://localhost:3000/wishList';

  // public methods
  add(id: string) {
    return this.http.post<{ id: string }>(
      this.jsonServerUrl,
      { id },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      }
    );
  }

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<{ id: string }[]>(`${this.jsonServerUrl}`);
  }

  remove(id: string) {
    return this.http.delete(`${this.jsonServerUrl}/${id}`);
  }
}
