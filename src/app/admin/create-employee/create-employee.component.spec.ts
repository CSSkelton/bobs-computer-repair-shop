import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEmployeeComponentComponent } from './create-employee.component';

describe('CreateEmployeeComponent', () => {
  let component: CreateEmployeeComponentComponent;
  let fixture: ComponentFixture<CreateEmployeeComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEmployeeComponentComponent]
    });
    fixture = TestBed.createComponent(CreateEmployeeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
