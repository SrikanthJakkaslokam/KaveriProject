import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KaveriBlockchainKeyComponent } from './kaveri-blockchain-key.component';

describe('KaveriBlockchainKeyComponent', () => {
  let component: KaveriBlockchainKeyComponent;
  let fixture: ComponentFixture<KaveriBlockchainKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KaveriBlockchainKeyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KaveriBlockchainKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
