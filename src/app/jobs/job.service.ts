import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
}

@Injectable({ providedIn: 'root' })
export class JobService {

  private jobsSubject = new BehaviorSubject<Job[]>([]);
  jobs$ = this.jobsSubject.asObservable();

  constructor() {
    const jobs: Job[] = [
      { id: 1, title: 'Angular Developer', company: 'Rare Tech', location: 'Bangalore' },
      { id: 2, title: 'Frontend Developer', company: 'TechNova Solutions', location: 'Hyderabad' },
      { id: 3, title: 'Java Developer', company: 'InfySoft', location: 'Chennai' },
      { id: 4, title: 'Full Stack Developer', company: 'CodeCraft Pvt Ltd', location: 'Pune' },
      { id: 5, title: 'UI Developer', company: 'DesignHub', location: 'Bangalore' },
      { id: 6, title: 'React Developer', company: 'WebWorks', location: 'Noida' },
      { id: 7, title: 'Software Engineer', company: 'NextGen IT', location: 'Mumbai' },
      { id: 8, title: 'Backend Developer', company: 'CloudMatrix', location: 'Hyderabad' },
      { id: 9, title: 'Angular Lead', company: 'Digital Minds', location: 'Bangalore' },
      { id: 10, title: 'Senior Java Developer', company: 'Enterprise Solutions', location: 'Chennai' },
      { id: 11, title: 'Web Developer', company: 'BrightApps', location: 'Kochi' },
      { id: 12, title: 'UI/UX Engineer', company: 'Creative Labs', location: 'Trivandrum' },
      { id: 13, title: 'Frontend Engineer', company: 'InnovateX', location: 'Pune' },
      { id: 14, title: 'Angular Engineer', company: 'StackWave', location: 'Bangalore' },
      { id: 15, title: 'Application Developer', company: 'TechBridge', location: 'Coimbatore' }
    ];
    this.jobsSubject.next(jobs);
  }

  getJobs(): Observable<Job[]> {
    return this.jobs$;
  }

  filterJobs(title?: string, location?: string): void {
    let filtered = this.jobsSubject.getValue();

    if (title) {
      filtered = filtered.filter(job => job.title.toLowerCase().includes(title.toLowerCase()));
    }

    if (location) {
      filtered = filtered.filter(job => job.location.toLowerCase().includes(location.toLowerCase()));
    }

    this.jobsSubject.next(filtered);
  }
}
