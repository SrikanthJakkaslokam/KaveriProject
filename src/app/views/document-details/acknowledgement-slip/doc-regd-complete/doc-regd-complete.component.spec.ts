import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocRegdCompleteComponent } from './doc-regd-complete.component';

describe('DocRegdCompleteComponent', () => {
  let component: DocRegdCompleteComponent;
  let fixture: ComponentFixture<DocRegdCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocRegdCompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocRegdCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
