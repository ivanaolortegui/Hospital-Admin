import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Medic } from '../models/medics.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicService {

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

  loadMedics() {
    const url = `${base_url}/medics`;
    return this.http.get<Medic[]>(url)
      .pipe(
        map((resp) => {
          console.log(resp);
        }));
  }

  createMedic(medic: string) {
    const url = `${base_url}/medics`;
    // return this.http.post( url, { nombre }, this.headers );
    return this.http.post(url, { medic });
  }

  updateMedic(medic: Medic) {
    const url = `${base_url}/medics/${medic}`;
    //return this.http.put( url, { name }, this.headers );
    return this.http.put(url, { medic });
  }

  deleteMedic(_id: string) {
    const url = `${base_url}/hospitals/${_id}`;
    // return this.http.delete(url, this.headers);
    return this.http.delete(url);
  }

  getMedicById(id: string) {

    const url = `${base_url}/medics/${id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp: { ok: boolean, medic: Medic }) => resp.medic)
      );
  }

} 
