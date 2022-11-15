import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { User } from '../models/user.model';
import { LoadUsers } from '../interfaces/load-users.interface';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})



export class UserService {

  constructor(private http: HttpClient,
    private router: Router,
  ) { }

  public user: User = new User('', '', '', '', '', '');

  userData: any = {};

  get uid(): string {
    return this.user.uid || '';
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  /* get role(): 'ADMIN_ROLE' | 'USER_ROLE' {
    return this.user.role;
  } */

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  saveLocalStorage(token: string, menu: any) {

    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));

  }

  valideToken(): any {
    // remove the password from the user object
    const token = localStorage.getItem('token');
    const { email, name, id, password, role, img = '', } = this.userData;
    this.user = new User(name, email, id, password, img, role);
    if (token) {
      this.saveLocalStorage(token, '');
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


  udpateUser(data: { email: string, name: string, id: string, role: string, }) {
    data = {
      ...data,
      role: this.userData.role,
    };

    return this.http.put(`${base_url}/users/${this.uid}`, data, {
    });

  }

  login(formData: LoginForm) {
    return this.http.get(`https://62be3a6bbe8ba3a10d4fb1c5.mockapi.io/users/?email=${formData}`)
      .pipe(
        tap((resp: any) => {
          console.log(resp);
          this.userData = resp[0];
          localStorage.setItem('token', resp[0].token)
        })
      );
    //  https://62be3a6bbe8ba3a10d4fb1c5.mockapi.io/api/v1/users/?email=test100@gmail.com
  }


  loadUsers(index: number = 1) {
    const url = `${base_url}/users?page=${index}&limit=5`;
    return this.http.get<LoadUsers[]>(url)
      .pipe(
        map((resp) => {
          const users = resp.map((user: any) => new User(user.name, user.email, user.id, '', user.img, user.role)
          );
          return {
            users
          };
          /*  const users = resp.users.map((user: any) => new User(user.nombre, user.email, user.uid, '', user.img, user.role)
           );
           return {
             
            total: resp.total,
             users
           }; */
        })
      )
  }

  deleteUser(user: User) {

    // /usuarios/5eff3c5054f5efec174e9c84
    const url = `${base_url}/users/${user.uid}`;
    return this.http.delete(url);
  }

  saveUser(user: User) {
    return this.http.put(`${base_url}/users/${user.uid}`, user, this.headers);
  }

}
