import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../job.service';

@Component({
  selector: 'app-apply-job',
  templateUrl: './apply-job.component.html',
  styleUrls: ['./apply-job.component.css']
})
export class ApplyJobComponent implements OnInit {

  applyForm!: FormGroup;
  jobTitle = '';
  successMessage = '';
  companyName = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private jobService:JobService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.loadJobTitle();
  }

  createForm(): void {
    this.applyForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      resumeUrl: ['']
    });
  }

  loadJobTitle(): void {
    const jobId = Number(this.route.snapshot.paramMap.get('id'));
    this.jobService.getJobs().subscribe(jobs => {
      const job = jobs.find(j => j.id === jobId);
      if (job) {
        this.jobTitle = job.title;
        this.companyName = job.company;  // new variable
      }
    });
  }

  submitForm(): void {
    if (this.applyForm.invalid) {
      return;
    }

    const formData = {
      ...this.applyForm.value,
      jobTitle: this.jobTitle
    };

    console.log('Application Submitted:', formData);
    this.successMessage = 'Application submitted successfully';
    this.applyForm.reset();
  }

  goToJobs(){
    this.router.navigate(['/jobs']);
  }
}
