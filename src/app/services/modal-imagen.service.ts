import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {
  private _hideModal: boolean = true;
  public tipo: 'usuarios' | 'medicos' | 'hospitales' = 'usuarios';
  public id: string = '';
  public img: string = '';

  public newImage: EventEmitter<string> = new EventEmitter<string>();

  get hideModal() {
    return this._hideModal;
  }

  openModal(
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    id: string,
    img: string = 'no-img'
  ) {
    console.log(img);

    this._hideModal = false;
    this.tipo = tipo;
    this.id = id;

    if (img.includes('https')) {
      this.img = img;
    } /* 
     else {
       this.img = `${base_url}/upload/${tipo}/${img}`;
     }  */
  }

  closeModal() {
    this._hideModal = true;
  }

  constructor() { }
}
