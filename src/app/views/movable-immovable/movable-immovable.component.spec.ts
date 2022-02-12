import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovableImmovableComponent } from './movable-immovable.component';

describe('MovableImmovableComponent', () => {
  let component: MovableImmovableComponent;
  let fixture: ComponentFixture<MovableImmovableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovableImmovableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovableImmovableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
