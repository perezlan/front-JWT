import { Injectable } from '@angular/core';
import { LoginRequest } from '../../interfaces/login/loginRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, BehaviorSubject, tap } from 'rxjs';
import { LoginResponse } from '../../interfaces/login/loginResponse';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLoginOn:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData:BehaviorSubject<LoginResponse> = new BehaviorSubject<LoginResponse>({id:0, username:""});

  constructor(private http:HttpClient) { }

  login(loginRequest:LoginRequest):Observable<LoginResponse>{
    return this.http.get<LoginResponse>('../../../assets/data.json').pipe(
      tap(
        (response:LoginResponse)=>{
          this.currentUserData.next(response);
          this.currentUserLoginOn.next(true);
        },
      ),
      catchError(this.HandleError)
    );
  }

  // manejador de errores
  private HandleError(errorRespons:HttpErrorResponse){
    if(errorRespons.status === 0){
      console.error('se ha producido un error '+errorRespons.status);
    }else{
      console.log('Backend retorno el codigo de estado"',errorRespons.status, errorRespons.error);
      
    }
    return throwError(()=>new Error('Algo fallo, intente otra vez'));
  }


  // observables 
  get userData():Observable<LoginResponse>{
    return this.currentUserData.asObservable();
  }

  get userLoginOn( ):Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }
}
