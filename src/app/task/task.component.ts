import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskInstanceComponent } from '../tasks-instance/task-instance.component';
import { TaskInstance } from '../taskInstance';
import { TasksService } from '../tasks.service';


@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    CommonModule,
    TaskInstanceComponent,
  ],
  template: `
    <section>
      <form>
      <input type="text" placeholder="Filter by name/description" #filter>
      <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
    </section>
    <section class="results">
    <app-task-instance 
      *ngFor="let taskInstance of filteredTasksInstancesList" 
      [taskInstance]="taskInstance">
    </app-task-instance>
    </section>
  `,
  styleUrls: ['./task.component.css']
})

export class TaskComponent {
  tasksInstancesList: TaskInstance[] = [];
  filteredTasksInstancesList: TaskInstance[] = [];
  tasksService: TasksService = inject(TasksService);

  filterResults(text: string) {
    if (!text) {
      this.filteredTasksInstancesList = this.tasksInstancesList;
    }
  
    this.filteredTasksInstancesList = this.tasksInstancesList.filter(
      taskInstance => 
        taskInstance?.desc.toLowerCase().includes(text.toLowerCase()) 
        || taskInstance?.name.toLowerCase().includes(text.toLowerCase())
    );
  }

  constructor() {
    this.tasksService.getAllTaskInstances().then((tasksInstancesList: TaskInstance[]) => {
      this.tasksInstancesList = tasksInstancesList;
      this.filteredTasksInstancesList = tasksInstancesList;
    });
}
  
}