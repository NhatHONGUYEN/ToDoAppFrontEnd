import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatCheckboxModule,
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  loading = false;
  error: string | null = null;
  newTaskTitle = '';
  currentStatus: 'all' | 'pending' | 'done' = 'all';

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.load('all');
  }

  load(status: 'all' | 'pending' | 'done') {
    this.currentStatus = status;
    this.loading = true;
    this.error = null;
    this.taskService.list(status).subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message || 'Erreur lors du chargement';
        this.loading = false;
      },
    });
  }

  addTask() {
    if (!this.newTaskTitle.trim()) return;

    this.loading = true;
    this.taskService
      .create({
        title: this.newTaskTitle,
        completed: false,
        dueDate: new Date().toISOString(), // Date d'échéance au format ISO string
      })
      .subscribe({
        next: (newTask) => {
          this.tasks.unshift(newTask);
          this.newTaskTitle = '';
          this.loading = false;
        },
        error: (err) => {
          this.error = err.message || 'Erreur lors de la création de la tâche';
          this.loading = false;
        },
      });
  }

  deleteTask(id: number | undefined) {
    if (id === undefined) return;

    this.taskService.delete(id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter((task) => task.id !== id);
      },
    });
  }
}
