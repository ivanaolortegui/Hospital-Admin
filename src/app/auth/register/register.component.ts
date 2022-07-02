import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {
  public formSubmitted: boolean = false;

  public registerForm: any = this.fb.group({
    name: ['Ivana', Validators.required],
    email: ['test100@gmail.com', [Validators.required, Validators.email]],
    password: ['123456', Validators.required],
    password2: ['123456', Validators.required],
    term: [true, Validators.required],
  }, {
    validators: this.samePasswords('password', 'password2')
  });
  constructor(private fb: FormBuilder,
    private usuarioService: UserService,
    private router: Router) { }

  createUser() {
    this.formSubmitted = true;
    console.log(this.registerForm.value);
    if (this.registerForm.invalid) {
      return;
    }

    // Realizar el posteo
    this.usuarioService.createUser(this.registerForm.value).subscribe(resp => {
      console.log(resp);

      // Navegar al Dashboard
      this.router.navigateByUrl('/');

    }
    )

  }

  invalidField(field: string): boolean {
    if (this.registerForm.get(field).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }


  invalidPasswords() {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if ((pass1 !== pass2) && this.formSubmitted) {
      return true;
    } else {
      return false;
    }

  }

  acceptTerms() {
    return !this.registerForm.get('term').value && this.formSubmitted;
  }

  samePasswords(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control: any = formGroup.get(pass1Name);
      const pass2Control: any = formGroup.get(pass2Name);
      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null)
      } else {
        pass2Control.setErrors({ noEsIgual: true })
      }
    }
  }

}
