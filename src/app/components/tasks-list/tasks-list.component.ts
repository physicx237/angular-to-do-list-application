import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TasksService } from '../../services/tasks.service';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.scss',
  imports: [TaskComponent],
})
export class TasksList {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly tasksService = inject(TasksService);

  tasks = this.tasksService.getTasks();

  /** Открытие формы создания задачи. */
  navigateToAddTaskForm() {
    this.router.navigate(['/task-form'], {
      relativeTo: this.activatedRoute,
      queryParams: { mode: 'add' },
    });
  }
}
