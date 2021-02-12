import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Field } from "./admin/field.model";
@Injectable({
  providedIn: 'root'
})
export class FieldsService {

  constructor(private http: HttpClient) { this.getFields() }
  fields!: Field[];
  currentField!:Field
 
  getFields() {
    return this.http.get<any>("http://87b451e65412.ngrok.io/get-fields")
    .pipe(
      tap(
        res =>{
          this.fields = res.fields;
        }
      )
    );
  }
  getSingleField(){
    return this.http.get<any>("http://87b451e65412.ngrok.io/get-field");
  }

  addNewField(fieldName:string){
    return this.http.post<any>("http://87b451e65412.ngrok.io/add-field"
    ,{
      fieldName:fieldName 
    });
  }
  editField(oldField:string,newField:string){
    return this.http.post<any>("http://87b451e65412.ngrok.io/update-field"
    ,{
      oldField:oldField,
      newField:newField 
    });
  }
  deleteField(fieldName:string){
    return this.http.post<any>("http://87b451e65412.ngrok.io/remove-field"
    ,{
      fieldName:fieldName
    });
  }
  // searchResult!:Field
  // searchField(searchTerm:string){
  //     this.searchResult = this.fields.find(s =>{
  //       s.name === searchTerm
  //     })!;
  // }
}
