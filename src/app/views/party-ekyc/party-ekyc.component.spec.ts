import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyEkycComponent } from './party-ekyc.component';

describe('PartyEkycComponent', () => {
  let component: PartyEkycComponent;
  let fixture: ComponentFixture<PartyEkycComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartyEkycComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyEkycComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
