import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogBoardComponent } from './catalog-board.component';

describe('CatalogBoardComponent', () => {
  let component: CatalogBoardComponent;
  let fixture: ComponentFixture<CatalogBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
