import {StudentModel} from './student.model';

export interface PathModel {
  id?: number;
  name?: string;
  description: string;
  category_id: number
  Student?: StudentModel;
}
