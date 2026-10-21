import { Component, inject, input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Task } from '../../interfaces/task.interface';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly tasksService = inject(TasksService);

  readonly task = input<Task>();

  /** Переключение состояния выполнения переданной задачи. */
  toggleTaskCompletion() {
    const task = this.task();

    if (!task) return;

    this.tasksService.editTask({ ...task, completed: !task.completed });
  }

  /** Открытие формы редактирования переданной задачи. */
  navigateToEditTaskForm() {
    const task = this.task();

    if (!task) return;

    this.router.navigate(['/task-form/', task.id], {
      relativeTo: this.activatedRoute,
      queryParams: { mode: 'edit' },
    });
  }
}
