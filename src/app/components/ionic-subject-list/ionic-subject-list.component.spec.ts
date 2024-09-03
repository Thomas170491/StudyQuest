import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IonicSubjectListComponent } from './ionic-subject-list.component';

describe('IonicSubjectListComponent', () => {
  let component: IonicSubjectListComponent;
  let fixture: ComponentFixture<IonicSubjectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicSubjectListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IonicSubjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
