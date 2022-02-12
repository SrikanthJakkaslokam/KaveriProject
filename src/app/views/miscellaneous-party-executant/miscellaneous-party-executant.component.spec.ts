import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscellaneousPartyExecutantComponent } from './miscellaneous-party-executant.component';

describe('MiscellaneousPartyExecutantComponent', () => {
  let component: MiscellaneousPartyExecutantComponent;
  let fixture: ComponentFixture<MiscellaneousPartyExecutantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiscellaneousPartyExecutantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscellaneousPartyExecutantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
