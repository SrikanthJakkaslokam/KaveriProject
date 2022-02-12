import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcApplicationForSubmitComponent } from './ec-application-for-submit.component';

describe('EcApplicationForSubmitComponent', () => {
  let component: EcApplicationForSubmitComponent;
  let fixture: ComponentFixture<EcApplicationForSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcApplicationForSubmitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EcApplicationForSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
