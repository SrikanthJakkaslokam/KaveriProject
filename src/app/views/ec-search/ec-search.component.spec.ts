import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcSearchComponent } from './ec-search.component';

describe('EcSearchComponent', () => {
  let component: EcSearchComponent;
  let fixture: ComponentFixture<EcSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EcSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
