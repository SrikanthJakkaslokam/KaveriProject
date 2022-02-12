import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyDetailsExecutantComponent } from './party-details-executant.component';

describe('PartyDetailsExecutantComponent', () => {
  let component: PartyDetailsExecutantComponent;
  let fixture: ComponentFixture<PartyDetailsExecutantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartyDetailsExecutantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyDetailsExecutantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
