import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskInstance } from '../taskInstance';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-task-instance',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink,
    RouterOutlet,
  ],
  template: `
    <section class="listing">
      <h2 class="listing-heading">{{ taskInstance.name }}</h2>
      <p class="listing-task">{{ taskInstance.desc.slice(0,150)}}...</p>
      <a [routerLink]="['/details', taskInstance.id]">Details</a>
    </section>
  `,
  styleUrls: ['./task-instance.component.css']
})
export class TaskInstanceComponent {
  @Input() taskInstance!: TaskInstance;
}
