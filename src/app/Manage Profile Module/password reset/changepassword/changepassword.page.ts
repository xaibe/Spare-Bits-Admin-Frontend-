import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { UserService } from '../../../../sdk/core/user.service';
import { AuthService } from '../../../../sdk/core/auth.service';
import { Platform } from '@ionic/angular';
import { ToastService } from 'src/sdk/custom/toast.service';
import { AdminService } from 'src/sdk/core/admin.service';
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.page.html',
  styleUrls: ['./changepassword.page.scss'],
})
export class ChangepasswordPage implements OnInit {

 
  changePasswordForm: FormGroup;
  fetchedData: void;
  constructor(
    private adminService:AdminService,
    private toastService :ToastService,
    private platform: Platform,
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder) { 
    this.platform.backButton.subscribeWithPriority(10, () => {
      //console.log('Handler was called!');
      this.router.navigate(['login']);
    });
   }
  clicked = false;
  hasverified=false;
  ngOnInit() {
    this.formInitializer();
  }

  formInitializer() {
    this.changePasswordForm = this.formBuilder.group({
       password: [null, [Validators.required]]
    });
  }
    subscrib(fetchedData,pass){
      this.adminService.updatepassword(this.fetchedData,pass).subscribe(
        data => {
          this.authService.clearLocalStorage();
          const message="You may now login with the New Password,YOUR PASSWORD IS UPDATED!";
        this.toastService.presentpositiveToast(message);
      
        this.clicked=false;  
         this.router.navigateByUrl('/login');
        },
    
        error => {      
          
          this.clicked=false;      
          const message="Please Enter a password more than 6 digits,Failed!";
        this.toastService.presenterrorToast(message);
      
        }
        );
        
        
    }
    
    updatePassword(){
    try{
      const semail="email";
      this.authService.getTokenFromStorage(semail).then(data => {
          this.fetchedData = data;
    
          //console.log('token email',this.fetchedData);
          
          this.clicked = true;
          const pass = this.changePasswordForm.value;
          //console.log('form text',pass);
         
        this.subscrib(this.fetchedData,pass);
        })
          .catch(error => { console.log('fethching error',error) });
          }
          catch (ex) {
            console.log('ex', ex);
        } 
    }
  
 


 
}
