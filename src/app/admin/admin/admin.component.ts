import { Component, OnInit } from '@angular/core';
import { Field } from "./field.model";

import { ConfirmationService, Message } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { FieldsService } from '../fields.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {


  constructor(private fieldsService:FieldsService,
    private messageService: MessageService, 
    private confirmationService: ConfirmationService,
    private router: Router
    ) { }

    fields!:Field[];  
    displayAdd: boolean = false;
    displayEdit: boolean = false;
    searchTerm!:string;
    addFieldForm!:FormGroup;
    editFieldForm!:FormGroup;
    currentFieldId:any;
    currentFieldIndex!:number;
  ngOnInit(): void {
    this.fieldsService.getFields().subscribe(
      res =>{
        this.fields = res.fields;
      }
    );
     this.fieldsService.fields = this.fields ;
    this.addFieldForm = new FormGroup({
      "fieldname" : new FormControl(null,[Validators.required,Validators.minLength(2)])
    });
    this.editFieldForm = new FormGroup({
      "fieldname" : new FormControl(null,[Validators.required,Validators.minLength(2)])
    })
  }
  //this.fields[this.currentFieldIndex].name

  test(){

    console.log(this.fields[0].name);
  }
  ////////////////////////// Add New Field
  showAddDialog() { //For showing overlay to add new field
    this.displayAdd = true;
  }

  onAddNewField(){
    this.fieldsService.addNewField(this.addFieldForm.get('fieldname')!.value).subscribe(
      (res) =>{
        if(res.done == true){
          this.displayAdd = false;
          this.fields.push(res.field);
          this.addFieldForm = new FormGroup({
            "fieldname" : new FormControl(null,Validators.required)
          })
        }else{
          console.log('some error occured');
        }
      }
    );
    
  }
////////////////////////// Edit Field
  showEditDialog(fieldId:string,index:number){
    this.editFieldForm = new FormGroup({
      "fieldname" : new FormControl(this.fields[index].name,[Validators.required,Validators.minLength(2)])
    })
    this.displayEdit = true;
    this.currentFieldId = fieldId;
    this.currentFieldIndex = index;

    console.log("field id " + fieldId + " and index is " + index);
  }
  onEditField(){
    let oldName:string = this.fields[this.currentFieldIndex].name!;
    let newName:string = this.editFieldForm.get('fieldname')!.value;
    console.log(newName);
    this.fieldsService.editField(oldName,newName).subscribe(
      res =>{
        if(res.done == true){
          this.displayEdit = false;
          this.fields[this.currentFieldIndex].name = res.name; 
        }
      },err =>{
        console.log(err.msg);
      }
    );

    //this.addFieldForm?.updateValueAndValidity;
  }
  /////////////////////////// Delete Field
  msgs: Message[] = [];
  confirmDeletion(fieldId:string,index:number) {
    // this.fieldsService.deleteField(fieldId).subscribe(
    //   res =>{
    //     if(res == 'deleted'){
          
    //     }
    //   }
    // );
    let fieldName:string = this.fields[index].name!;
    this.confirmationService.confirm({
      
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.fieldsService.deleteField(fieldName).subscribe(
            res =>{
              if(res == true){
                this.messageService.add({key: 'tr', severity:'success', summary: 'Done!', detail: 'Record deleted'});
                this.fields.splice(index,1);
              }else{
                this.messageService.add({key: 'tr', severity:'error', summary: 'error', detail:'Record Not deleted' });
              }
            },err =>{
              this.messageService.add({key: 'tr', severity:'error', summary: 'error', detail: err.message});
            }
          );
        },
        reject: () => {
          this.messageService.add({key: 'tr', severity:'error', summary: 'error', detail: 'You have rejected'});
        }
    });
}
  onViewSingleField(id:string,index:number){
    this.fieldsService.currentField = this.fields[index];
    this.router.navigate(['field/'+id]);
  }
}
