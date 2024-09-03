import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IonicChapterListComponent } from './ionic-chapter-list.component';

describe('IonicChapterListComponent', () => {
  let component: IonicChapterListComponent;
  let fixture: ComponentFixture<IonicChapterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicChapterListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IonicChapterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
