import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockexamComponent } from './mockexam.component';

describe('MockexamComponent', () => {
  let component: MockexamComponent;
  let fixture: ComponentFixture<MockexamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MockexamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MockexamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
