import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobListComponent } from './job-list/job-list.component';
import { ApplyJobComponent } from './apply-job/apply-job.component';
import { JobsRoutingModule } from './jobs-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    JobListComponent,
    ApplyJobComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    JobsRoutingModule
  ]
})
export class JobsModule { }
