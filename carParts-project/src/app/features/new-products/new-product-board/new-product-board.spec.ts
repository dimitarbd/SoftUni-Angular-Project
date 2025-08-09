import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProductBoard } from './new-product-board';

describe('NewProductBoard', () => {
  let component: NewProductBoard;
  let fixture: ComponentFixture<NewProductBoard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewProductBoard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewProductBoard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
