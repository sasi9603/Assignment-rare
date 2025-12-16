import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobListComponent } from './job-list/job-list.component';
import { AuthGuard } from '../core/auth.guard';
import { ApplyJobComponent } from './apply-job/apply-job.component';

const routes: Routes = [
  {
    path: '',
    component: JobListComponent,
    canActivate:[AuthGuard]
  },
  { path: 'apply/:id', component: ApplyJobComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule {}