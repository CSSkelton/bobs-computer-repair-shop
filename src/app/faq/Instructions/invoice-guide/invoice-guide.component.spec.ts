import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceGuideComponent } from './invoice-guide.component';

describe('InvoiceGuideComponent', () => {
  let component: InvoiceGuideComponent;
  let fixture: ComponentFixture<InvoiceGuideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvoiceGuideComponent]
    });
    fixture = TestBed.createComponent(InvoiceGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
