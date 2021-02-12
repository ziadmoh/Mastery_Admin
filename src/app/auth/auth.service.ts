import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';


//////////////////////////////////////////////////////////////////////// Response 
export interface AuthResponseData {
  userId:string,
  userToken:string;
}
////////////////////////////////////////////////////////////////////// Auth Service 
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient,
              private router:Router
    ) {}
    
  newUser = new BehaviorSubject<User>(null!);
  errorSub = new Subject<string>();

  formValues:string[]=[] ;

  

//////////////////////////////////////////////////////////////////////// Log In
  userLogin(emailOrUserName: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://masterytest.000webhostapp.com/public/api/Login',
        {
          nameEmail :emailOrUserName ,
          password : password
        }
      )
      .pipe(
        //catchError(this.handleError),
        tap((resData) => {
          this.handleUserAuth(
            resData.userId,
            resData.userToken,
          );
        })
      );
  }
  ////////////////////////////////// Auto Log in
  userAutoLogin(){
    const userData:{
      userId:string,
      userToken:string;
    } = JSON.parse(localStorage.getItem('userData')!);
      if(!userData){
        return;
      }
      const loadedUser = new User(userData.userId, userData.userToken);
      this.newUser.next(loadedUser);
  }
//////////////////////////////////////////////////////////////////////// Log out
userLogout(){
  return this.http
  .post(
    'https://masterytest.000webhostapp.com/public/api/logout',
    {
      Secret_Key:"1234",
    },
    {
      //HEADERS
    }
  ).subscribe(
    resData =>{
      console.log(resData);
      this.newUser.next(null!);
      this.router.navigate(['/home']);
      localStorage.removeItem('userData');
    },errorMSg =>{
      console.log(errorMSg);
    }
  );


} 

////////////////////////////////////////////////////////////////////////  HandleUserAuth New User 
private handleUserAuth(
  userId:string,
  userToken:string,
) {
  const user = new User(userId, userToken);
  this.newUser.next(user);
  localStorage.setItem(
    'userData', JSON.stringify(user)
  );
}
//////////////////////////////////////////////////////////////////////// Handle Error

private handleError(errorRes: HttpErrorResponse) {
  let errorMessage = 'An unknown error occurred!';
  if (!errorRes.error || !errorRes.error.message) {
    return throwError(errorMessage);
  }else{
    errorMessage = errorRes.message;
    return throwError(errorMessage);
  }
  
}


}
