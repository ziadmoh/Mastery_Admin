import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import { AdminComponent } from './admin/admin/admin.component';
import { FieldComponent } from './admin/field/field.component';

///////////**** PRIME NG */
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {MenubarModule} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';
import {CalendarModule} from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RadioButtonModule} from 'primeng/radiobutton';
import {DropdownModule} from 'primeng/dropdown';
import {PasswordModule} from 'primeng/password';
import {FileUploadModule} from 'primeng/fileupload';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import {DialogModule} from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {ToastModule} from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {CardModule} from 'primeng/card';
import { CourseComponent } from './admin/course/course.component';
import { LoginComponent } from './auth/login/login.component';
//** SEARCH */
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    FieldComponent,
    HeaderComponent,
    CourseComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    //primeNg
    ButtonModule,
    InputTextModule,
    MenubarModule,
    CalendarModule,
    FileUploadModule,
    RadioButtonModule,
    DropdownModule,
    PasswordModule,
    MessagesModule,
    MessageModule, 
    ConfirmDialogModule,
    //primeNg For admin fields
    DialogModule,
    ToastModule,
    CardModule,
    //Search 
    Ng2SearchPipeModule
  ],
  providers: [ MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
