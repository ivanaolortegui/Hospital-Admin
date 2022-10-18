import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  constructor() { }

  async updatePhoto(
    archivo: File,
    id: string
  ) {

    try {

      const url = `${base_url}/users/${id}`;
      const formData = new FormData();
      formData.append('img', `http://loremflickr.com/640/480}`);
      console.log(formData);
      const resp = await fetch(url, {
        method: 'PUT',
        body: formData
      });

      const data = await resp.json();

      if (data.ok) {
        console.log(data);
        return data;
      } else {
        console.log(data);
        return false;
      }

    } catch (error) {
      console.log(error);
      return false;
    }

  }

}
