import { Component, OnInit, ElementRef} from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

import { ToastrService } from 'ngx-toastr';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  submitted = false;
  //error = '';
  loginForm!: FormGroup;
  loginCred: any = {
    username: "",
    password: ""
  };

  forgotEmail : NgForm;
  forgotMail :any ;
  recoverform = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private elementRef: ElementRef) { }


  ngOnInit(): void {
    //Validation Set
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  // convenience getter for easy access to form fields
  get lf() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true
    if (this.loginForm.invalid) {
      return;
    } else {
      this.authService.login(this.loginCred)
        .subscribe(
          {
            next: data => {
              let respData = JSON.parse(JSON.stringify(data))
              console.log('processing...',  respData.data.access_token);
              var decoded = jwt_decode(respData.data.access_token);
              console.log('-----------decoded', typeof decoded);
              console.log('-----------decoded', decoded);
        
              
              this.router.navigate(['/parameter-master']);
              this.toastr.success('Successfully Logged');
            },
            error: error => {    
              console.log('----------error', error);
              
              if(error?.status == 404 ){ this.toastr.error('User not found'); }
              else if(error?.error?.status == 401) {
                this.toastr.error('Access denied') 
              }
              else{
                this.toastr.error('Logged In Failed');
              }
            },
            complete: () => {
              
              
            }
          }
        );
    }

  }

  sendForgotPassMail(form: any) {
    let mail = this.forgotMail
    form.resetForm();
    this.elementRef.nativeElement.querySelector('#forgot-password').click();
    this.authService.sendForgotPassword({ "mail": mail }).subscribe({
      next: response => alert("Mail send successfully"),
      error: err => alert(err.error.message)
    });
  }
}
