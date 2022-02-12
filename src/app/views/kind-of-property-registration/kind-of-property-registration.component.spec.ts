import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KindOfPropertyRegistrationComponent } from './kind-of-property-registration.component';

describe('KindOfPropertyRegistrationComponent', () => {
  let component: KindOfPropertyRegistrationComponent;
  let fixture: ComponentFixture<KindOfPropertyRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KindOfPropertyRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KindOfPropertyRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
