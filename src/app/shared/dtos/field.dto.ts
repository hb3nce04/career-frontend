import {StudentDto} from './student.dto';
import {CategoryDto} from './category.dto';

export interface FieldDto {
  id: number;
  name: string;
  description: string;
  Category: CategoryDto;
  Student: StudentDto;
}
