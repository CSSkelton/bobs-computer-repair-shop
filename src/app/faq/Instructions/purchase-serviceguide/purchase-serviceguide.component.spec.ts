import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseServiceguideComponent } from './purchase-serviceguide.component';

describe('PurchaseServiceguideComponent', () => {
  let component: PurchaseServiceguideComponent;
  let fixture: ComponentFixture<PurchaseServiceguideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PurchaseServiceguideComponent]
    });
    fixture = TestBed.createComponent(PurchaseServiceguideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
