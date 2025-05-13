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

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent implements OnInit {
  form!: FormGroup;
  public taskId?: number;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Initialiser le formulaire ici au lieu de le faire comme propriété de classe
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
        this.taskService
          .list('all') // ou mieux: créer un endpoint GET /{id}
          .subscribe((tasks) => {
            const t = tasks.find((task) => task.id === this.taskId);
            if (t) {
              this.form.patchValue({
                title: t.title,
                description: t.description,
                dueDate: t.dueDate,
                completed: t.completed,
              });
            }
          });
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const data = this.form.value as unknown as Task;
    if (this.taskId) {
      data.id = this.taskId;
      this.taskService
        .update(data)
        .subscribe(() => this.router.navigate(['/tasks']));
    } else {
      this.taskService
        .create(data)
        .subscribe(() => this.router.navigate(['/tasks']));
    }
  }
}
