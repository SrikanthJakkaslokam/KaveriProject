import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyDetailsWitnessComponent } from './party-details-witness.component';

describe('PartyDetailsWitnessComponent', () => {
  let component: PartyDetailsWitnessComponent;
  let fixture: ComponentFixture<PartyDetailsWitnessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartyDetailsWitnessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyDetailsWitnessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
