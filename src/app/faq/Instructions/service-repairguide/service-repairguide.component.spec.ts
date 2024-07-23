import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceRepairguideComponent } from './service-repairguide.component';

describe('ServiceRepairguideComponent', () => {
  let component: ServiceRepairguideComponent;
  let fixture: ComponentFixture<ServiceRepairguideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceRepairguideComponent]
    });
    fixture = TestBed.createComponent(ServiceRepairguideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
