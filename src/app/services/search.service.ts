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
  /*   private transformUsers(results: any[]): User[] {
      return results.map(
        user => new User(user.nombre, user.email, '', user.img, user.google, user.role, user.uid)
      );
    }

 private transformHospitals( results: any[] ): Hospital[] {
    return results;
}
 private transformMedics( results: any[] ): Medic[] {
    return results;
}
   */
  search(
    type: 'usuarios' | 'medicos' | 'hospitales',
    term: string
  ) {

    console.log(type, term);

    const url = `${base_url}`;
    /*   return this.http.get<any[]>( url, this.headers )
               .pipe(
                 map( (resp: any ) => { 
   
                   switch ( type ) {
                     case 'usuarios':
                       return this.transformUsers( resp.resultados )
   
                     case 'hospitales':
                       return this.transformHospitals( resp.resultados )
   
                     case 'medicos':
                        return this.transformMedics( resp.resultados )
                   
                     default:
                       return [];
                   }
   
                 })
               );  */

  }

  globalSearch(terms: string) {

    const url = `${base_url}/todo/${terms}`;
    return this.http.get(url, this.headers);

  }

}
