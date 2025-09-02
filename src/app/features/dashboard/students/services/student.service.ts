import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StudentModel} from '../../../../shared/models/student.model';
import {BaseResponseDto} from '../../../../core/dto/base-response.dto';
import {ENVIRONMENT} from '../../../../../environments/environment';

@Injectable({providedIn: 'root'})
export class StudentService {
  private httpClient: HttpClient = inject(HttpClient);
  private apiUrl: string = ENVIRONMENT.API_URL + "/students";

  getAllByClassId(classId: number): Observable<StudentModel[]> {
    return this.httpClient.get<StudentModel[]>(`${ENVIRONMENT.API_URL}/classes/${classId}/students`, {withCredentials: true});
  }

  delete(id: number): Observable<BaseResponseDto> {
    return this.httpClient.delete<BaseResponseDto>(`${this.apiUrl}/${id}`, {withCredentials: true});
  }

  create(classId: number, id: number, name: string, professionOrSectorId: string, categoryId: number, description: string, isDayShift: boolean): Observable<BaseResponseDto> {
    let sectorId = undefined;
    let professionId = undefined;
    if (professionOrSectorId.includes('p')) {
      professionId = professionOrSectorId.replace('p', '');
    } else if (professionOrSectorId.includes('s')) {
      sectorId = professionOrSectorId.replace('s', '');
    }
    return this.httpClient.post<BaseResponseDto>(`${this.apiUrl}`, {
      id, name, classId, dayShift: isDayShift, sectorId, professionId, categoryId, description
    }, {withCredentials: true});
  }

  update(classId: number, id: number, name: string, professionOrSectorId: string, categoryId: number, description: string, isDayShift: boolean): Observable<BaseResponseDto> {
    let sectorId = undefined;
    let professionId = undefined;
    if (professionOrSectorId.includes('p')) {
      professionId = professionOrSectorId.replace('p', '');
    } else if (professionOrSectorId.includes('s')) {
      sectorId = professionOrSectorId.replace('s', '');
    }
    return this.httpClient.put<BaseResponseDto>(`${this.apiUrl}/${id}`, {
      id, name, classId, dayShift: isDayShift, sectorId, professionId, categoryId, description
    }, {withCredentials: true});
  }
}
