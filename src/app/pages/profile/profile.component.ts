import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {
  public profileForm: FormGroup
  public user: User = new User('', '', '', '', '', '');;
  public imagenUpload: any;
  public imgTemp: any = null;

  constructor(private fb: FormBuilder, private userService: UserService, private fileUploadService: FileUploadService) {
    this.user = userService.user;
    this.profileForm = this.fb.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
  }

  updateProfile() {
    this.userService.udpateUser(this.profileForm.value)
      .subscribe((resp: any) => {
        const { name, email } = resp;
        this.user.name = name;
        this.user.email = email;
        console.log(resp);
        /*      Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
           }, (err) => {
             Swal.fire('Error', err.error.msg, 'error'); */
      });
  }

  changeImage(event: any): void | null {
    const file = event.target.files[0]
    this.imagenUpload = file;
    console.log(file);
    if (!file) {
      return this.imgTemp = null;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }

  }

  uploadImagen() {
    this.fileUploadService.updatePhoto(this.imagenUpload, this.user.uid)
      .then(img => {
        this.user.img = img;
        // Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');
      }).catch(err => {
        console.log(err);
        //  Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      })
  }
}
