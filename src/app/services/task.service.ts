import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  // URL de ton API backend (ajuste le port si nécessaire)
  private apiUrl = 'http://localhost:8081/api/tasks';

  constructor(private http: HttpClient) {}

  /** Récupère la liste des tâches, filtrée par status (all|pending|done) */
  list(status: 'all' | 'pending' | 'done' = 'all'): Observable<Task[]> {
    const params = new HttpParams().set('status', status);
    return this.http.get<Task[]>(this.apiUrl, { params });
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

  /** Marque une tâche comme terminée */
  markDone(id: number): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}/done`, {});
  }

  /** Supprime une tâche */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
