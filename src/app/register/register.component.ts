import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { AuthService } from './../auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private authService:AuthService, private fb: FormBuilder, private router: Router){}

  email:string='';
  password:string='';
  passwordConfirmation:string='';
  formRegister: FormGroup = new FormGroup({
    email: new FormControl(this.email, [Validators.required]),
    password: new FormControl(this.password, [Validators.required, Validators.minLength(6), Validators.maxLength(16)]),
    passwordConfirmation: new FormControl(this.passwordConfirmation, [Validators.required, Validators.minLength(6), Validators.maxLength(16)])
  });

  registrar(): void {
    this.authService
    .register(this.formRegister.value.email, this.formRegister.value.password, this.formRegister.value.passwordConfirmation).subscribe({
        next: res=>{
          if (res.token) {
            this.authService.saveToken(res.token);
            this.router.navigate(['/']);
          }
        },
        error: (err)=>{
          
          console.log(err)
        },
        complete: () => console.info('complete') 
      }
    )
  }
}
