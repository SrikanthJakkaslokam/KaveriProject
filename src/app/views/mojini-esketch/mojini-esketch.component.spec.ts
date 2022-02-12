import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MojiniEsketchComponent } from './mojini-esketch.component';

describe('MojiniEsketchComponent', () => {
  let component: MojiniEsketchComponent;
  let fixture: ComponentFixture<MojiniEsketchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MojiniEsketchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MojiniEsketchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
