import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordguideComponent } from './reset-passwordguide.component';

describe('ResetPasswordguideComponent', () => {
  let component: ResetPasswordguideComponent;
  let fixture: ComponentFixture<ResetPasswordguideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResetPasswordguideComponent]
    });
    fixture = TestBed.createComponent(ResetPasswordguideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
