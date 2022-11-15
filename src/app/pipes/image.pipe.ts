import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string, tipo: 'users' | 'medics' | 'hospitals'): string {
    return img;
  }

}
