import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryFilterService {
  private categorySubject = new BehaviorSubject<string | null>(null);
  public category$ = this.categorySubject.asObservable();

  setCategory(category: string | null): void {
    this.categorySubject.next(category);
  }

  getCurrentCategory(): string | null {
    return this.categorySubject.value;
  }

  clearCategory(): void {
    this.categorySubject.next(null);
  }
}
