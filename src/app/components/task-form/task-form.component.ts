import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent implements OnInit {
  form!: FormGroup;
  public taskId?: number;
  minDate: Date = new Date(); // Date minimum = aujourd'hui

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    public router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {
    // Réinitialiser les heures, minutes et secondes pour que minDate soit à minuit
    this.minDate.setHours(0, 0, 0, 0);
  }

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      dueDate: ['', Validators.required],
      completed: [false],
    });

    // Si on a un id en param, on charge la tâche pour édition
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.taskId = +params['id'];
        this.taskService.get(this.taskId).subscribe({
          next: (task) => {
            let dueDate = task.dueDate;
            if (dueDate && dueDate.includes('T')) {
              dueDate = dueDate.split('T')[0];
            }

            this.form.patchValue({
              title: task.title,
              description: task.description,
              dueDate: dueDate,
              completed: task.completed,
            });
          },
          error: (err) => {
            console.error('Erreur lors du chargement', err);
            this.notificationService.showError(
              'Erreur lors du chargement de la tâche'
            );
          },
        });
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.notificationService.showError(
        'Veuillez corriger les erreurs du formulaire'
      );
      return;
    }

    const data: Task = {
      title: this.form.value.title,
      description: this.form.value.description || '',
      dueDate: this.form.value.dueDate,
      completed: !!this.form.value.completed,
    };

    if (this.taskId) {
      data.id = this.taskId;
      this.taskService.update(data).subscribe({
        next: () => {
          this.router.navigate(['/tasks']);
          this.notificationService.showSuccess('Tâche mise à jour avec succès');
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour', err);
          this.notificationService.showError(
            'Erreur lors de la mise à jour de la tâche'
          );
        },
      });
    } else {
      this.taskService.create(data).subscribe({
        next: () => {
          this.router.navigate(['/tasks']);
          this.notificationService.showSuccess('Tâche créée avec succès');
        },
        error: (err) => {
          console.error('Erreur lors de la création', err);
          this.notificationService.showError(
            'Erreur lors de la création de la tâche'
          );
        },
      });
    }
  }
}
