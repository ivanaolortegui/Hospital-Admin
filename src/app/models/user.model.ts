import { environment } from '../../environments/environment';
const base_url = environment.base_url;
export class User {
  constructor(
    public name: string,
    public email: string,
    public uid: string,
    public password?: string,
    public img?: string,
    //  public google?: boolean,
    public role?: string,
  ) { }

  get imgUrl(): string | undefined {
    return this.img;
    if (this.img?.includes('https')) {
      console.log(this.img);

      return this.img;
    }
    /* 
    discomment this if you want to use cloudinary
        if (this.img) {
          return `${base_url}/upload/usuarios/${this.img}`;
        } else {
          return `${base_url}/upload/usuarios/no-image`;
        } */
  }
}

