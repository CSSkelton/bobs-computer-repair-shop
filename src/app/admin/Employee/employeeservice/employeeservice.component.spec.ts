import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeserviceComponent } from './employeeservice.component';

describe('EmployeeserviceComponent', () => {
  let component: EmployeeserviceComponent;
  let fixture: ComponentFixture<EmployeeserviceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeserviceComponent]
    });
    fixture = TestBed.createComponent(EmployeeserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
