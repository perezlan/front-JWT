import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { LoginRequest } from '../../interfaces/login/loginRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm = this.fb.group({
    username: ['perezlan',[Validators.required]],
    password: ['',Validators.required],
  });

  loginError:string='';
  constructor(private fb: FormBuilder, private router: Router, private loginService:LoginService) {}


  //funciones
  login(){
    if(this.loginForm.valid){

     

      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next:(usuario)=>{
          console.log(usuario);
          
        },
        error:(e)=> {
          console.error(`Error al intentar loguearse ${e}`);
          this.loginError=e;
        },
        complete:()=>{ 
          console.log('Completado');
          console.log('Login successful');
          this.router.navigate(['inicio']);
          this.loginForm.reset();
      }
      });
      
      

    }else{
      this.loginForm.markAllAsTouched()
      alert("ERROR al ingresar los datos");
    }
  }


  // Getter and setters
  get username() { 
    return this.loginForm.controls.username;
  }

  get password(){
    return this.loginForm.controls.password;
  }
}
