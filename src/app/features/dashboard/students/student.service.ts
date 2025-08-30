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

  create(classId: number, id: number, name: string, professionOrSectorId: string, categoryId: number, fieldDescription: string, isDayShift: boolean): Observable<BaseResponseDto> {
    let sectorId = undefined;
    let professionId = undefined;
    if (professionOrSectorId.includes('p')) {
      professionId = professionOrSectorId.replace('p', '');
    } else if (professionOrSectorId.includes('s')) {
      sectorId = professionOrSectorId.replace('s', '');
    }
    return this.httpClient.post<BaseResponseDto>(`${this.apiUrl}`, {
      id, name, classId, dayShift: isDayShift, sectorId, professionId, categoryId, description: fieldDescription
    }, {withCredentials: true});
  }

  update(classId: number, id: number, name: string, professionOrSectorId: string, categoryId: number, fieldDescription: string, isDayShift: boolean): Observable<BaseResponseDto> {
    let sectorId = undefined;
    let professionId = undefined;
    if (professionOrSectorId.includes('p')) {
      professionId = professionOrSectorId.replace('p', '');
    } else if (professionOrSectorId.includes('s')) {
      sectorId = professionOrSectorId.replace('s', '');
    }
    return this.httpClient.put<BaseResponseDto>(`${this.apiUrl}/${id}`, {
      id, name, classId, dayShift: isDayShift, sectorId, professionId, categoryId, description: fieldDescription
    }, {withCredentials: true});
  }
}
