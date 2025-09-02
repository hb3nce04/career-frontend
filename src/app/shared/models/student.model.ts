import {ClassModel} from './class.model';
import {SectorModel} from './sector.model';
import {ProfessionModel} from './profession.model';
import {FieldModel} from './field.model';

export interface StudentModel {
  id: number;
  name: string;
  day_shift: boolean;
  Class: ClassModel;
  Sector: SectorModel;
  Profession: ProfessionModel;
  Field: FieldModel;
}
