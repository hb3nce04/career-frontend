import {ClassModel} from './class.model';
import {SectorModel} from './sector.model';
import {ProfessionModel} from './profession.model';
import {PathModel} from './path.model';

export interface StudentModel {
  id: number;
  firstName: string;
  lastName: string;
  isDayShift: boolean;
  Class: ClassModel;
  sector: SectorModel;
  profession: ProfessionModel;
  career: PathModel;
}
