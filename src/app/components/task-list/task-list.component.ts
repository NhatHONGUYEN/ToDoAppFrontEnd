import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService, PageResponse } from '../../services/task.service';
import { NotificationService } from '../../services/notification.service';
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
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
  MatPaginatorModule,
  PageEvent,
  MatPaginatorIntl,
} from '@angular/material/paginator';
import { delay } from 'rxjs/operators';
import { FrenchPaginatorIntl } from '../../shared/french-paginator-intl';

interface FilteredTasks {
  all: Task[];
  pending: Task[];
  done: Task[];
}

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
    MatSnackBarModule,
    MatPaginatorModule,
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: FrenchPaginatorIntl }],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: FilteredTasks = {
    all: [],
    pending: [],
    done: [],
  };
  loading = false;
  showLoading = false;
  error: string | null = null;
  newTaskTitle = '';
  currentStatus: 'all' | 'pending' | 'done' = 'all';

  // Pagination
  totalItems = 0;
  pageSize = 30; // Augmenter le nombre d'éléments par page
  pageIndex = 0;
  pageSizeOptions = [10, 30, 50, 100];

  constructor(
    private taskService: TaskService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.load();
  }

  load(
    status?: 'all' | 'pending' | 'done',
    page: number = 0,
    size: number = this.pageSize
  ) {
    if (status) {
      this.currentStatus = status;
    }

    this.loading = true;
    setTimeout(() => {
      if (this.loading) this.showLoading = true;
    }, 500);

    this.error = null;
    this.taskService.list('all', page, size).subscribe({
      next: (response) => {
        this.tasks = response.content;
        this.totalItems = response.totalElements;
        this.pageIndex = response.number;
        this.pageSize = response.size;
        this.filterTasks();
        this.loading = false;
        this.showLoading = false;
      },
      error: (err) => {
        this.error = err.message || 'Erreur lors du chargement';
        this.loading = false;
        this.showLoading = false;
        this.notificationService.showError(
          'Erreur lors du chargement des tâches'
        );
      },
    });
  }

  filterTasks() {
    // Toutes les tâches
    this.filteredTasks.all = [...this.tasks];

    // Tâches en cours
    this.filteredTasks.pending = this.tasks.filter((task) => !task.completed);

    // Tâches terminées
    this.filteredTasks.done = this.tasks.filter((task) => task.completed);
  }

  addTask() {
    if (!this.newTaskTitle.trim()) return;

    this.loading = true;
    this.taskService
      .create({
        title: this.newTaskTitle,
        completed: false,
        dueDate: new Date().toISOString(),
      })
      .subscribe({
        next: (newTask) => {
          this.newTaskTitle = '';
          this.loading = false;
          this.notificationService.showSuccess('Tâche créée avec succès');
          // Recharger les tâches
          this.load();
        },
        error: (err) => {
          this.error = err.message || 'Erreur lors de la création de la tâche';
          this.loading = false;
          this.notificationService.showError(
            'Erreur lors de la création de la tâche'
          );
        },
      });
  }

  deleteTask(id: number | undefined) {
    if (id === undefined) return;

    this.taskService.delete(id).subscribe({
      next: () => {
        this.notificationService.showSuccess('Tâche supprimée avec succès');
        // Recharger les tâches
        this.load();
      },
      error: (err) => {
        this.error = err.message || 'Erreur lors de la suppression de la tâche';
        this.notificationService.showError('Erreur lors de la suppression');
      },
    });
  }

  // Gestion des événements de pagination
  handlePageEvent(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.load(undefined, this.pageIndex, this.pageSize);
  }
}
