import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentEndorsementComponent } from './document-endorsement.component';

describe('DocumentEndorsementComponent', () => {
  let component: DocumentEndorsementComponent;
  let fixture: ComponentFixture<DocumentEndorsementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentEndorsementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentEndorsementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
