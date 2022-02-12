import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KindOfSaleComponent } from './kind-of-sale.component';

describe('KindOfSaleComponent', () => {
  let component: KindOfSaleComponent;
  let fixture: ComponentFixture<KindOfSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KindOfSaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KindOfSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
