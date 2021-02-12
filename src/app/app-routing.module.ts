import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin/admin.component';
import { CourseComponent } from './admin/course/course.component';
import { FieldComponent } from './admin/field/field.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  {path:'',component:AdminComponent},
  {path:'login',component:LoginComponent},
  {path:'admin',component:AdminComponent},
  {path:'field/:id',component:FieldComponent},
  {path:'course/:id',component:CourseComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
