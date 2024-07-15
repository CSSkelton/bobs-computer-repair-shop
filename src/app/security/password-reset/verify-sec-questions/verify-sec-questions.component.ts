/**
 * Title: verify-sec-questions.component.ts
 * Author: Cody Skelton
 * Date: 07.14.2024
 */

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from'@angular/router';
import { HttpClient } from '@angular/common/http';
import { ISecurityQuestion } from 'src/app/security-question-interface';

@Component({
  selector: 'app-verify-sec-questions',
  templateUrl: './verify-sec-questions.component.html',
  styleUrls: ['./verify-sec-questions.component.css']
})
export class VerifySecQuestionsComponent {

  selectedSecurityQuestions: ISecurityQuestion[];
  email: string;
  question1: string;
  question2: string;
  question3: string;

  secQuestionForm: FormGroup = this.fb.group({
    answer1: [null, Validators.compose([Validators.required])],
    answer2: [null, Validators.compose([Validators.required])],
    answer3: [null, Validators.compose([Validators.required])]
  })

  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private http: HttpClient) {
    // Initialize declared variables
    this.selectedSecurityQuestions = [];
    this.email = this.route.snapshot.queryParamMap.get('email') ?? ''
    this.question1 = ''
    this.question2 = ''
    this.question3 = ''

    if (!this.email) {
      this.router.navigate(['/security/verify-email'])
      return
    }

    this.http.get(`/api/users/${this.email}/security-questions`).subscribe({
      next: (data: any) => {
        this.selectedSecurityQuestions = data.selectedSecurityQuestions
      },
      error: (err) => {
        console.log('Server Error from findSelectedSecurityQuestions Call:', err)
      },
      complete: () => {
        this.question1 = this.selectedSecurityQuestions[0].question
        this.question2 = this.selectedSecurityQuestions[1].question
        this.question3 = this.selectedSecurityQuestions[2].question
      }
    })
  }

  onSubmit() {
    console.log(this.secQuestionForm.value)

    let securityQuestions = [
      {
        question: this.question1,
        answer: this.secQuestionForm.controls['answer1'].value
      },
      {
        question: this.question2,
        answer: this.secQuestionForm.controls['answer2'].value
      },
      {
        question: this.question3,
        answer: this.secQuestionForm.controls['answer3'].value
      }
    ]

    console.log(securityQuestions)

    this.http.post(`/api/security/verify/users/${this.email}/security-questions`, {securityQuestions}).subscribe({
      next: (res) => {
        console.log('Response:', res)
        this.router.navigate(['/security/signin'], )
      },
      error: (err) => {
        console.log('Error from verifySecurityQuestions API Call', err)
      }
    })
  }
}
