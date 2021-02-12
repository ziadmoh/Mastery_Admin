import { Injectable } from '@angular/core';
import { Course } from './course.model';
import { FieldsService } from './fields.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private fieldService:FieldsService) { }
  currentCourse!:Course
  getCourseInfo(){
   // this.currentCourse = this.fieldService.fields[0].courses![0];
  }
}
