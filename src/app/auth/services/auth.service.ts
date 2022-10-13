import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Observable, of, tap } from 'rxjs';
import { AuthResponce, User } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseUrl: string = environment.baseUrl;
  private _user!: User;

  get user() {
    return {...this._user};
  }

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    const url = `${this._baseUrl}/auth/login`;
    const body = {email, password};
    return this.http.post<AuthResponce>(url, body).pipe(
      tap(({ok, token}) => {
        if (ok) {
          localStorage.setItem('token', token!)
        }
      }),
      map(valid => valid.ok),
      catchError(err => of(err.error.msg))
    );
  }

  validateToken(): Observable<boolean> {
    const url = `${this._baseUrl}/auth/renew`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');
    return this.http.get<AuthResponce>(url, {headers}).pipe(
      map(resp => {
        localStorage.setItem('token', resp.token!);
        this._user = {
          name: resp.name!,
          uid: resp.uid!,
          email: resp.email!
        }
        return resp.ok;
      }),
      catchError(err => of(false))
    );
  }

  logout() {
    localStorage.clear();
  }

  registerUser(name: string, email: string, password: string) {
    const url = `${this._baseUrl}/auth/register`;
    const body = {name, email, password}; 
    return this.http.post<AuthResponce>(url,body).pipe(
      tap(({ok, token}) => {
        if (ok) {
          localStorage.setItem('token', token!)
        }
      }),
      map(valid => valid.ok),
      catchError(err => of(err.error.msg))
    );
  }
}
