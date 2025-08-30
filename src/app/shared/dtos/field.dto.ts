import {StudentDto} from './student.dto';

export interface FieldDto {
  id?: number;
  name?: string;
  description: string;
  category_id: number
  Student?: StudentDto;
}
