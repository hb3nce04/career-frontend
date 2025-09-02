import {StudentModel} from './student.model';

export interface FieldModel {
  id?: number;
  name?: string;
  description: string;
  category_id: number
  Student?: StudentModel;
}
