import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifetokensComponent } from './lifetokens.component';

describe('LifetokensComponent', () => {
  let component: LifetokensComponent;
  let fixture: ComponentFixture<LifetokensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LifetokensComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LifetokensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
