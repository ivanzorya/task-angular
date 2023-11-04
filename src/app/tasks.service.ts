import { Injectable } from '@angular/core';
import { TaskInstance } from './taskInstance';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  url = 'http://localhost:3000/tasks';
  
  
  async getAllTaskInstances(): Promise<TaskInstance[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }
  
  async getTaskInstanceById(id: number): Promise<TaskInstance | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? {};
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(`Tasks application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`);
  }

  constructor() { }
}
