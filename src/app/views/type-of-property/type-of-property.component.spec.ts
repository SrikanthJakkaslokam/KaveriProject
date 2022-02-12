import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeOfPropertyComponent } from './type-of-property.component';

describe('TypeOfPropertyComponent', () => {
  let component: TypeOfPropertyComponent;
  let fixture: ComponentFixture<TypeOfPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeOfPropertyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeOfPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
