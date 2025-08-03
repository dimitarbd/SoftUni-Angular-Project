import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderBoardComponent } from './slider-board.component';

describe('SliderBoardComponent', () => {
  let component: SliderBoardComponent;
  let fixture: ComponentFixture<SliderBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SliderBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
