import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  loading = false;
  error: string | null = null;
  newTaskTitle = '';

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.load('all');
  }

  load(status: 'all' | 'pending' | 'done') {
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
}
