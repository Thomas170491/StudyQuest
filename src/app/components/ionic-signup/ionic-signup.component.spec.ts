import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IonicSignupComponent } from './ionic-signup.component';

describe('IonicSignupComponent', () => {
  let component: IonicSignupComponent;
  let fixture: ComponentFixture<IonicSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicSignupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IonicSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
