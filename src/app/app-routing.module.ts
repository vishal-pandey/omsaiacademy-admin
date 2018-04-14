import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './services/auth-guard.service';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { SectionComponent } from './components/section/section.component';
import { FacultyComponent } from './components/faculty/faculty.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { DownloadComponent } from './components/download/download.component';

const routes: Routes = [
	{ path: '', component: LoginComponent},
	{
		path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuardService],
    children: [
        {
          path: 'section',
          component: SectionComponent
        },
        {
          path: 'faculty',
          component: FacultyComponent
        },
        {
          path: 'schedule',
          component: ScheduleComponent
        },
        {
          path: 'gallery',
          component: GalleryComponent
        },
        {
          path: 'download',
          component: DownloadComponent
        },

      ]
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
