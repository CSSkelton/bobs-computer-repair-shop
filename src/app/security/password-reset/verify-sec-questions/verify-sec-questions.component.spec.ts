import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifySecQuestionsComponent } from './verify-sec-questions.component';

describe('VerifySecQuestionsComponent', () => {
  let component: VerifySecQuestionsComponent;
  let fixture: ComponentFixture<VerifySecQuestionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerifySecQuestionsComponent]
    });
    fixture = TestBed.createComponent(VerifySecQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
