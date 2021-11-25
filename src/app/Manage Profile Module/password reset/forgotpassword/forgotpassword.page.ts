import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../../../../sdk/core/auth.service';
import { Platform } from '@ionic/angular';
import { AdminService } from 'src/sdk/core/admin.service';
import {ToastService} from'src/sdk/custom/toast.service';
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})
export class ForgotpasswordPage implements OnInit {
  forgotPasswordForm: FormGroup;
  loading=false;
  constructor(
    private platform: Platform,
    private router: Router,
    private toastService :ToastService,
    private formBuilder: FormBuilder,
     private adminService: AdminService,
     private authService:AuthService, ) { 
   
   }
  clicked = false;
  ngOnInit() {
    this.formInitializer();
  }

  formInitializer() {
    this.forgotPasswordForm = this.formBuilder.group({
       email: [null, [Validators.required, Validators.email]]
    });
  }

  forgotPassword() {
    try {
    this.clicked = true;
    const semail='email';
    const forgotData = this.forgotPasswordForm.value;
    //const authemail = this.forgotPasswordForm.value['email'];
    //console.log('ForgotPaswordData:', forgotData);
    ////console.log('email:', authemail);

    this.adminService.userForgotPassword(forgotData).subscribe(
      data => {
        
this.toastService.presentpositiveToast("Email Sent! Check your email,Success!");
        this.authService.saveTokenToStorage(semail,forgotData);
      // this.authService.SetItemtoStorage(semail,authemail);
        this.clicked = false;
        this.loading = false;
        this.router.navigateByUrl('/verifyEmail');
      },
      error => {
        console.log("error message",error.message);
        //console.log("error ",error.error.message);
        if(error.error.message=== "This user doesnot exists. Please signup first")

        {
this.toastService.presenterrorToast(error.error.message);
 this.forgotPasswordForm.reset();
 this.loading=false;
 this.clicked=false;
  this.ngOnInit();
}
else{
  const message="Cannot Send Email! Server Down ,Failed!";
        this.toastService.presenterrorToast(message);
        this.forgotPasswordForm.reset();
        this.loading=false;
        this.clicked=false;
        this.ngOnInit();
      }  
        
        }
    );
    } catch (ex) {
        //console.log('ex', ex);
      }
  }
}
