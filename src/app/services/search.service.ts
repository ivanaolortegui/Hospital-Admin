import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

import { User } from '../models/user.model';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }
  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }
  /*   private transformUsers(resultados: any[]): User[] {
      return resultados.map(
        user => new User(user.nombre, user.email, '', user.img, user.google, user.role, user.uid)
      );
    }
   */
  search(
    type: 'usuarios' | 'medicos' | 'hospitales',
    term: string
  ) {

    console.log(type, term);

    /*     const url = `${base_url}`;
        return this.http.get<any[]>(url, this.headers)
          .pipe(
            map((resp: any) => {
    
              switch (tipo) {
                case 'usuarios':
                  return this.transformUsers(resp.resultados)
    
                default:
                  return [];
              }
    
            })
          ); */
  }

}
