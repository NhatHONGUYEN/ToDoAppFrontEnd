import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { NotificationService } from '../../services/notification.service';
import { Task } from '../../models/task.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDialogModule,
  ],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss',
})
export class TaskDetailsComponent implements OnInit {
  task: Task | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private taskService: TaskService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<TaskDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { taskId: number }
  ) {}

  ngOnInit() {
    this.loading = true;
    const id = this.data.taskId;

    if (id) {
      this.taskService.get(id).subscribe({
        next: (task) => {
          this.task = task;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Erreur lors du chargement de la tâche';
          this.loading = false;
          this.notificationService.showError(this.error);
        },
      });
    } else {
      this.error = 'ID de tâche non trouvé';
      this.loading = false;
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
