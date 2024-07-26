import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserConfiguguideComponent } from './user-configuguide.component';

describe('UserConfiguguideComponent', () => {
  let component: UserConfiguguideComponent;
  let fixture: ComponentFixture<UserConfiguguideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserConfiguguideComponent]
    });
    fixture = TestBed.createComponent(UserConfiguguideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
