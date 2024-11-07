import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { AuthService } from './../auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private authService:AuthService, private fb: FormBuilder, private router: Router){}

  email:string='';
  password:string='';
  formlogin: FormGroup = new FormGroup({
    email: new FormControl(this.email, [Validators.required]),
    password: new FormControl(this.password, [Validators.required, Validators.minLength(6), Validators.maxLength(16)])
  });

  ingresar(){
    this.authService
    .login(this.formlogin.value.email, this.formlogin.value.password).subscribe({
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
