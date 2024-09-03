import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickreviewComponent } from './quickreview.component';

describe('QuickreviewComponent', () => {
  let component: QuickreviewComponent;
  let fixture: ComponentFixture<QuickreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuickreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuickreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
