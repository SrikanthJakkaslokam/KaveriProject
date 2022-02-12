import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KaveriBlockchainKeyResultsComponent } from './kaveri-blockchain-key-results.component';

describe('KaveriBlockchainKeyResultsComponent', () => {
  let component: KaveriBlockchainKeyResultsComponent;
  let fixture: ComponentFixture<KaveriBlockchainKeyResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KaveriBlockchainKeyResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KaveriBlockchainKeyResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
