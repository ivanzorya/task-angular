import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TasksService } from '../tasks.service';
import { TaskInstance } from '../taskInstance';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  template: `
    <article>
      <section class="listing-description">
        <h2 class="listing-heading">{{taskInstance?.name}}</h2>
        <p class="listing-task">{{taskInstance?.desc}}</p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this task</h2>
        <ul>
          <li>Ready: {{taskInstance?.done}}</li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Apply to review</h2>
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="first-name">First Name</label>
          <input id="first-name" type="text" formControlName="firstName">
  
          <label for="last-name">Last Name</label>
          <input id="last-name" type="text" formControlName="lastName">
  
          <label for="email">Email</label>
          <input id="email" type="email" formControlName="email">
          <button type="submit" class="primary">Apply now</button>
        </form>
      </section>
    </article>
  `,
  styleUrls: ['./details.component.css']
})

export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  tasksService = inject(TasksService);
  taskInstance: TaskInstance | undefined;
  
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  });

  constructor() {
    const taskInstanceId = parseInt(this.route.snapshot.params['id'], 10);
    this.tasksService.getTaskInstanceById(taskInstanceId).then(taskInstance => {
      this.taskInstance = taskInstance;
    });
  }

  submitApplication() {
    this.tasksService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    );
  }
}