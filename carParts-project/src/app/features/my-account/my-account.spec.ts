import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyAccountComponent } from './my-account';
import { PartService } from '../../core/services/part.service';
import { AuthService } from '../../core/services/auth.service';
import { of } from 'rxjs';

class PartServiceMock { getByOwner() { return of([]); } }
class AuthServiceMock { getCurrentUserId() { return '1'; } currentUser = () => ({ email: 'test@test.com' } as any); }

describe('MyAccountComponent', () => {
  let component: MyAccountComponent;
  let fixture: ComponentFixture<MyAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyAccountComponent],
      providers: [
        { provide: PartService, useClass: PartServiceMock },
        { provide: AuthService, useClass: AuthServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MyAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


