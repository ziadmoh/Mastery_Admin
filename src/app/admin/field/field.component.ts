import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Field } from '../admin/field.model';
import { CourseService } from '../course.service';
import { FieldsService } from '../fields.service';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {

  constructor(private fieldService:FieldsService,
              private activeRoute:ActivatedRoute,
              private courseService:CourseService,
              private router:Router) { }
  field!:Field
  ngOnInit(): void {
    this.field = this.fieldService.currentField;
    if(this.field == null || this.field == undefined ){
      this.fieldService.getFields().subscribe(
        res =>{
          this.fieldService.fields = res.fields;
          //console.log(this.fieldService.fields.find( f => f.id === this.activeRoute.snapshot.params['id'])!);
          this.field = this.fieldService.fields.find( f => f.id === this.activeRoute.snapshot.params['id'])! ;
        }
      );
    }
    //this.field = this.fieldService.fields.find( f => f.id === this.activeRoute.snapshot.params['id'])!
    // this.fieldService.getFields().subscribe(
    //   res => {
    //     this.field = res.fields[this.activeRoute.snapshot.params['id']];
    //   }
    // );
    // this.fieldService.getSingleField(this.activeRoute.snapshot.params['id']).subscribe(
    //   res =>{
    //     this.field = res;
    //   }
    // )
    //this.fieldService.currentField.id = this.activeRoute.snapshot.params['id'];
  //  console.log(this.fieldService.fields.find( f => f.id === this.activeRoute.snapshot.params['id'])!);
    

  }
  onViewCourse(index:number,id:string){
     this.courseService.currentCourse = this.field.courses![index];
     this.router.navigate(['course/'+id]);
  }
  test(){
    console.log(parseInt('10'));
  }
}
