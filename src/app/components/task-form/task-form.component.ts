import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Task } from '../../interfaces/task.interface';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
  imports: [ReactiveFormsModule],
})
export class TaskForm {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  readonly mode = this.activatedRoute.snapshot.queryParamMap.get('mode');

  private readonly tasksService = inject(TasksService);

  readonly taskForm = new FormGroup({
    description: new FormControl<string>('', Validators.required),
  });

  /** Открытие списка задач. */
  navigateToTasksList() {
    this.router.navigate(['/tasks-list'], { relativeTo: this.activatedRoute });
  }

  /** Создание задачи по данным формы и открытие списка задач. */
  addTask() {
    if (this.taskForm.invalid) return;

    const value = this.taskForm.value as Task;

    this.tasksService.addTask(value.description);

    this.navigateToTasksList();
  }

  /** Сохранение описания задачи из формы и открытие списка задач. */
  editTask() {
    if (this.taskForm.invalid) return;

    const value = this.taskForm.value as Task;

    const task = this.tasksService.getTask(Number(this.activatedRoute.snapshot.paramMap.get('id')));

    if (!task) return;

    this.tasksService.editTask({ ...task, description: value.description });

    this.navigateToTasksList();
  }
}
