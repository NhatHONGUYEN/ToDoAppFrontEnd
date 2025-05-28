import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number; // Numéro de page actuelle
  first: boolean;
  last: boolean;
  empty: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private baseApiUrl =
    'https://todoappbackend-production-3438.up.railway.app/api/tasks';

  // URLs pour chaque contrôleur spécifique
  private readUrl = `${this.baseApiUrl}/read`;
  private createUrl = `${this.baseApiUrl}/create`;
  private updateUrl = `${this.baseApiUrl}/update`;
  private deleteUrl = `${this.baseApiUrl}/delete`;

  constructor(private http: HttpClient) {}

  /** Récupère la liste des tâches, filtrée par status (all|pending|done) avec pagination */
  list(
    status: string = 'all',
    page: number = 0,
    size: number = 10
  ): Observable<PageResponse<Task>> {
    return this.http.get<PageResponse<Task>>(
      `${this.readUrl}?status=${status}&page=${page}&size=${size}`
    );
  }

  /** Récupère une tâche par son ID */
  get(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.readUrl}/${id}`);
  }

  /** Crée une nouvelle tâche */
  create(task: Task): Observable<Task> {
    return this.http.post<Task>(this.createUrl, task);
  }

  /** Met à jour une tâche existante */
  update(task: Task): Observable<Task> {
    if (!task.id) {
      throw new Error('Task ID is required for update');
    }
    return this.http.put<Task>(`${this.updateUrl}/${task.id}`, task);
  }

  /** Supprime une tâche */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.deleteUrl}/${id}`);
  }

  /** Marque une tâche comme terminée */
  toggleStatus(id: number): Observable<Task> {
    return this.http.put<Task>(`${this.updateUrl}/${id}/done`, {});
  }
}
