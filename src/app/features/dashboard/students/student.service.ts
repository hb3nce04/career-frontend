import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
import {StudentDto} from '../../../shared/dtos/student.dto';
import {BaseResponseDto} from '../../../core/dto/base-response.dto';

@Injectable({providedIn: 'root'})
export class StudentService {
  private httpClient: HttpClient = inject(HttpClient);
  private apiUrl: string = environment.apiUrl + "/students";

  getAllByClassId(classId: number): Observable<StudentDto[]> {
    return this.httpClient.get<StudentDto[]>(`${environment.apiUrl}/classes/${classId}/students`, {withCredentials: true});
  }

  delete(id: number): Observable<BaseResponseDto> {
    return this.httpClient.delete<BaseResponseDto>(`${this.apiUrl}/${id}`, {withCredentials: true});
  }
}
