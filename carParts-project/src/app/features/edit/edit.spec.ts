import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditComponent } from './edit';
import { PartService } from '../../core/services/part.service';
import { AuthService } from '../../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

class PartServiceMock { getOne() { return of({ _id: '1', title: 't', description: '', imageUrl: '', price: 0, rating: 0, category: '' }); } updatePart() { return of({}); } }
class AuthServiceMock { isLoggedIn() { return true; } }
class ActivatedRouteMock { snapshot = { paramMap: new Map([['id','1']]) }; }
class RouterMock { navigateByUrl() {} navigate() {} }

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditComponent],
      providers: [
        { provide: PartService, useClass: PartServiceMock },
        { provide: AuthService, useClass: AuthServiceMock },
        { provide: ActivatedRoute, useClass: ActivatedRouteMock },
        { provide: Router, useClass: RouterMock },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


