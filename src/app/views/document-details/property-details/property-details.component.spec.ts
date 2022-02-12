import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocumentService } from '../document.service';
import { DocumentServiceMock } from './mock';

import { PropertyDetailsComponent } from './property-details.component';

describe('PropertyDetailsComponent', () => {
  let component: PropertyDetailsComponent;
  let fixture: ComponentFixture<PropertyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyDetailsComponent ],
      providers: [{provide: DocumentService, useClass: DocumentServiceMock}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
