import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, FormControl, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
  })
  export class ValidatorService {
    constructor(private http:HttpClient){}

    fieldNameCheck(): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            return this.http.post('http://a8d121c60494.ngrok.io/admin/',
            { fieldName:control.value} 
            ).pipe( map(res => {
                  //if fieldName is take
                  //res = true;
                  if (res == true) {
                     // this.fieldNameExists = '0'; //invalid
                      return { 'fieldNameExists': true }; 
                  }else{
                      //this.userNameExists = '1';
                      return null;
                  }
              })
            );
        };
    }

  }