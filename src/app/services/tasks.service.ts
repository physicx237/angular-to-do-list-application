import { Injectable, signal } from '@angular/core';

import { Task } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  tasks = signal<Task[]>([]);

  /** Получение задачи по идентификатору или undefined при её отсутствии. */
  getTask(id: number) {
    return this.tasks().find((task) => task.id === id);
  }

  /** Получение текущего массива задач. */
  getTasks() {
    return this.tasks();
  }

  /** Создание невыполненной задачи с указанным описанием. */
  addTask(description: string) {
    const id = this.tasks().length ? this.tasks()[this.tasks().length - 1].id + 1 : 0;

    const newTask: Task = {
      id,
      description,
      completed: false,
    };

    this.tasks.update((currentTasks) => [...currentTasks, newTask]);
  }

  /** Замена задачи с совпадающим идентификатором. */
  editTask(task: Task) {
    this.tasks.update((currentTasks) =>
      currentTasks.map((item) => (item.id === task.id ? task : item)),
    );
  }

  /** Удаление задачи по её идентификатору. */
  removeTask(task: Task) {
    this.tasks.update((currentTasks) => currentTasks.filter((item) => item.id !== task.id));
  }
}
