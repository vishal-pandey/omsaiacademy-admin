import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { CookieService } from 'ngx-cookie-service';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import { AuthGuardService } from './services/auth-guard.service';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { SectionComponent } from './components/section/section.component';
import { FacultyComponent } from './components/faculty/faculty.component';
import { FacultyEdit } from './components/faculty/faculty.component';
import { FacultyAdd } from './components/faculty/faculty.component';
import { FacultyDelete } from './components/faculty/faculty.component';
import { Snackbar } from './components/faculty/faculty.component';
import { FacultyService } from './services/faculty.service';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { BatchAdd } from './components/schedule/schedule.component';
import { BatchDelete } from './components/schedule/schedule.component';
import { BatchEdit } from './components/schedule/schedule.component';
import { ScheduleService } from './services/schedule.service';
import { GalleryComponent } from './components/gallery/gallery.component';
import { UploadSlider } from './components/gallery/gallery.component';
import { DeleteImg } from './components/gallery/gallery.component';
import { GalleryService } from './services/gallery.service';
import { DownloadComponent } from './components/download/download.component';
import { FileUpload } from './components/download/download.component';
import { FileDelete } from './components/download/download.component';
import { DownloadService } from './services/download.service';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    LoginComponent,
    SectionComponent,
    FacultyComponent,
    FacultyEdit,
    FacultyAdd,
    FacultyDelete,
    Snackbar,
    ScheduleComponent,
    BatchAdd,
    BatchDelete,
    BatchEdit,
    GalleryComponent,
    UploadSlider,
    DeleteImg,
    DownloadComponent,
    FileUpload,
    FileDelete
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatTooltipModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  providers: [AuthGuardService, AuthService, CookieService, FacultyService, ScheduleService, GalleryService, DownloadService],
  bootstrap: [AppComponent],
  entryComponents: [FacultyEdit, FacultyAdd, FacultyDelete, Snackbar, BatchEdit, BatchDelete, BatchAdd, UploadSlider, DeleteImg, FileUpload, FileDelete]
})
export class AppModule { }
