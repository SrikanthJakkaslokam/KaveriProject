import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KindOfRegistrationComponent } from './kind-of-registration.component';

describe('KindOfRegistrationComponent', () => {
  let component: KindOfRegistrationComponent;
  let fixture: ComponentFixture<KindOfRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KindOfRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KindOfRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
