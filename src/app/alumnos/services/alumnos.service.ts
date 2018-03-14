import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

import { Alumno } from '../models/alumno';
import { SerializeService } from '../../core/serialize.service';
import { GetAlumnoOptions } from '../_interfaces/GetAlumnoOptions';

@Injectable()
export class AlumnosService {

  constructor(
    private http: HttpClient,
    private serializeService: SerializeService
  ) {}

  getAlumnos(search?: string): Observable<Alumno[]> {
    const f = this.getFilterGroups(search);
    return this.http
      .get(
        `${
          environment.apiBaseUrl
        }/usuarios?includes[]=alumno&${this.serializeService.serialize(f)}`
      )
      .pipe(map((al: any) => al.map(a => this.toAlumno(a))));
  }

  listadoAlumnos(useAlumnoId = false): Observable<Alumno[]> {
    return this.http.get(`${environment.apiBaseUrl}/alumnos`)
      .pipe(map((json: any) => json.map(a => this.toAlumno(a))));
  }

  getById(idAlumno: number, options: GetAlumnoOptions = {}): Observable<Alumno> {
    let url = `${environment.apiBaseUrl}/usuarios`;
    if (options.useAlumnoId) {
      const filter = {filter_groups: [{filters: [{key: 'idAlumno', value: idAlumno, operator: 'eq'}]}]};
      url += `?${this.serializeService.serialize(filter)}`;
    } else {
      url += `/${idAlumno}?`;
    }
    url += `&includes[]=alumno${options.withClases ? '.clases.actividad' : ''}`;
    return this.http.get(url).pipe(map(
      (json: any) => this.toAlumno(json instanceof Array ? json[0] : json))
    );
  }

  borrarAlumno(id) {
    return this.http.delete(`${environment.apiBaseUrl}/usuarios/${id}`);
  }

  guardarAlumno(data) {
    return this.http.post(`${environment.apiBaseUrl}/usuarios`, data);
  }

  editarAlumno(id: number, data) {
    return this.http.put(`${environment.apiBaseUrl}/usuarios/${id}`, data);
  }

  protected toAlumno(alumnoJson: any) {
    const alumno = new Alumno();
    alumno.fillFromJson(alumnoJson);
    return alumno;
  }

  protected getFilterGroups(search?) {
    const f = {
      filter_groups: [
        {
          filters: [{ key: 'isAlumno', value: true, operator: 'eq', not: true }]
        }
      ]
    };
    if (search) {
      f.filter_groups.push({
        filters: [
          { key: 'nombreApellido', value: search, operator: 'eq', not: true }
        ]
      });
    }
    return f;
  }
}
