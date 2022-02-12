import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SroDocSummaryComponent } from './sro-doc-summary.component';

describe('SroDocSummaryComponent', () => {
  let component: SroDocSummaryComponent;
  let fixture: ComponentFixture<SroDocSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SroDocSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SroDocSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
