import {MatPaginatorIntl} from '@angular/material/paginator';
import {Injectable} from '@angular/core';

@Injectable()
export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  constructor() {
    super();
    this.getAndInitTranslations();
  }
  getAndInitTranslations() {
    this.firstPageLabel = "Első oldal"
    this.lastPageLabel = "Utolsó oldal";
    this.itemsPerPageLabel = "Oldalanként:";
    this.nextPageLabel = "Következő oldal";
    this.previousPageLabel = "Előző oldal";
    this.changes.next();

  }
  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 / ${length} elem megjelenítve`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} / ${length} elem megjelenítve`;
  }
}
