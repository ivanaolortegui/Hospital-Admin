import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';

import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private http: HttpClient,
    private router: Router,
  ) { }


  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }


  valideToken(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    } else {
      return false;
    }
  }


  createUser(formData: RegisterForm): Observable<any> {
    return this.http.post(`${base_url}/users`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token)
        })
      )

  }

  login(formData: LoginForm) {
    return this.http.get(`${base_url}/users/?email=${formData}`)
      .pipe(
        tap((resp: any) => {
          console.log(resp);
          localStorage.setItem('token', resp[0].token)
        })
      );
    //  https://62be3a6bbe8ba3a10d4fb1c5.mockapi.io/api/v1/users/?email=test100@gmail.com
  }

}
