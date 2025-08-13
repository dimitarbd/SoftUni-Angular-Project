import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImportComponent } from './import';
import { PartService } from '../../core/services/part.service';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

class PartServiceMock { createPart() { return of({ _id: '1' }); } }
class AuthServiceMock { isLoggedIn() { return true; } }
class RouterMock { navigateByUrl() {} navigate() {} }

describe('ImportComponent', () => {
  let component: ImportComponent;
  let fixture: ComponentFixture<ImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportComponent],
      providers: [
        { provide: PartService, useClass: PartServiceMock },
        { provide: AuthService, useClass: AuthServiceMock },
        { provide: Router, useClass: RouterMock },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


