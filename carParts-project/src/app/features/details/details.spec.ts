import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsComponent } from './details';
import { PartService } from '../../core/services/part.service';
import { AuthService } from '../../core/services/auth.service';
import { CommentsService } from '../../core/services/comments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

class PartServiceMock { getOne() { return of({ _id: '1', title: 't', description: '', imageUrl: '', price: 0, rating: 0, category: '' }); } }
class AuthServiceMock { isLoggedIn() { return true; } getCurrentUserId() { return '1'; } }
class CommentsServiceMock { getAllByPart() { return of([]); } }
class ActivatedRouteMock { snapshot = { paramMap: new Map([['id','1']]) }; }
class RouterMock { navigateByUrl() {} navigate() {} }

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsComponent],
      providers: [
        { provide: PartService, useClass: PartServiceMock },
        { provide: AuthService, useClass: AuthServiceMock },
        { provide: CommentsService, useClass: CommentsServiceMock },
        { provide: ActivatedRoute, useClass: ActivatedRouteMock },
        { provide: Router, useClass: RouterMock },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


