import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TareaService {
  private baseUrl: string = 'http://localhost:3000/tarea';
  constructor(private http: HttpClient) { }
  // Método para registrar una tarea (POST)
  registrarTarea(tarea: { tituloTarea: string }): Observable<any> {
    const url = `${this.baseUrl}/registrar`;
    return this.http.post(url, tarea);
  }
  // Método para obtener todas las tareas (GET)
  obtenerTareas(): Observable<any[]> {
    const url = `${this.baseUrl}/all`;
    return this.http.get<any[]>(url);
  }

  completarTarea(idTarea: string): Observable<any> {
    const url = `${this.baseUrl}/completar/${idTarea}`;
    return this.http.put(url, {});
  }
  eliminarTarea(idTarea: string): Observable<any> {
    const url = `${this.baseUrl}/eliminar/${idTarea}`;
    return this.http.put(url, {});
  }
}
