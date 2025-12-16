import { Component, OnInit } from '@angular/core';
import { JobService } from '../job.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  jobs: any[] = [];
  searchText = '';
  locationFilter = '';

  constructor(
    private jobService: JobService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.jobService.getJobs().subscribe(data => {
      this.jobs = data;
    });
  }

  onSearchChange() {
    this.jobService.filterJobs(this.searchText, this.locationFilter);
  }

  applyJob(id: number) {
    console.log(id,"jobid");
    this.router.navigate(['/jobs/apply', id]);
  }
}
