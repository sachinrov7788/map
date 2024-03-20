import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private NAV_URL = environment.apiURL;

  constructor(private http: HttpClient) { }

  public getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.NAV_URL}/all`);
  }
}
