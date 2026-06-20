import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Part } from '../../models/part.model';
import { PartService } from './part.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchTermSubject = new BehaviorSubject<string>('');
  public searchTerm$ = this.searchTermSubject.asObservable();

  constructor(private partService: PartService) {}

  setSearchTerm(term: string): void {
    this.searchTermSubject.next(term);
  }

  getCurrentSearchTerm(): string {
    return this.searchTermSubject.value;
  }

  clearSearchTerm(): void {
    this.searchTermSubject.next('');
  }

  searchParts(searchTerm: string): Observable<Part[]> {
    if (!searchTerm.trim()) {
      return this.partService.getParts();
    }

    return this.partService.getParts().pipe(
      map(parts => {
        const lowercaseSearchTerm = searchTerm.toLowerCase().trim();
        return parts.filter(part => 
          part.title.toLowerCase().includes(lowercaseSearchTerm) ||
          part.description.toLowerCase().includes(lowercaseSearchTerm) ||
          part.category.toLowerCase().includes(lowercaseSearchTerm) ||
          (part.brand && part.brand.toLowerCase().includes(lowercaseSearchTerm))
        );
      })
    );
  }
}
