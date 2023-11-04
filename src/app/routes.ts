import { Routes } from '@angular/router';
import { TaskComponent } from './task/task.component';
import { DetailsComponent } from './details/details.component';


const routeConfig: Routes = [
    {
      path: '',
      component: TaskComponent,
      title: 'Home page'
    },
    {
      path: 'details/:id',
      component: DetailsComponent,
      title: 'Task details'
    }
  ];
  
  export default routeConfig;