import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl =
    'https://todoappbackend-production-3438.up.railway.app/api/tasks';

  constructor(private http: HttpClient) {}

  /** Récupère la liste des tâches, filtrée par status (all|pending|done) */
  list(status: string = 'all'): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}?status=${status}`);
  }

  /** Récupère une tâche par son ID */
  get(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  /** Crée une nouvelle tâche */
  create(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  /** Met à jour une tâche existante */
  update(task: Task): Observable<Task> {
    if (!task.id) {
      throw new Error('Task ID is required for update');
    }
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task);
  }

  /** Supprime une tâche */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /** Marque une tâche comme terminée */
  toggleStatus(id: number, completed: boolean): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/${id}/status`, { completed });
  }
}
