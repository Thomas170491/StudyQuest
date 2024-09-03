import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IonicLoginComponent } from './ionic-login.component';

describe('IonicLoginComponent', () => {
  let component: IonicLoginComponent;
  let fixture: ComponentFixture<IonicLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IonicLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
