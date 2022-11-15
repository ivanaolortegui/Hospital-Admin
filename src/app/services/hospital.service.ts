import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http: HttpClient,) { }

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

  loadHospitals() {
    const url = `${base_url}/hospitals`;
    return this.http.get<Hospital[]>(url)
      .pipe(
        map((resp) => {
          console.log(resp);
        }));
  }

  createHospital(name: string) {
    const url = `${base_url}/hospitals`;
    // return this.http.post( url, { nombre }, this.headers );
    return this.http.post(url, { name });
  }

  updateHospital(_id: string, name: string) {
    const url = `${base_url}/hospitals/${_id}`;
    //return this.http.put( url, { name }, this.headers );
    return this.http.put(url, { name });
  }

  deleteHospital(_id: string) {
    const url = `${base_url}/hospitals/${_id}`;
    // return this.http.delete(url, this.headers);
    return this.http.delete(url);
  }
}
