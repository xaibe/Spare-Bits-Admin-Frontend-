import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProjectConfig } from 'src/sdk/Project.config';
import { SideMenuService } from './../../../sdk/core/sidemenu.service';
import { AuthService } from './../../../sdk/core/auth.service';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from './../../../sdk/custom/toast.service';
import { UserService } from '../../../sdk/core/user.service';
import { AdminService } from 'src/sdk/core/admin.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  constructor(
    private adminService:AdminService,
private sideMenuService: SideMenuService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,   
    private toastService: ToastService,
    private authService: AuthService
  ) {}
  loginForm: FormGroup;
  loading = false;
  clicked =false;
userid
check
ngOnInit() {
    this.clicked = false;
    this.formInitializer();
  }

  formInitializer() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  register() {
    this.router.navigateByUrl('/register');
   }

   forgotPassword() {
     //console.log('working on it!');
     this.router.navigateByUrl('/forgotpassword');
   }

   ionViewWillEnter() {
    this.loading = false;
    this.clicked = false;
    this.loginForm.reset();
  }

  ionViewDidLoad() {
    this.loginForm.reset();
    }

    
async getuserid( useremail){
 
  const observable = await this.adminService.getSingleUser(useremail);
  observable.subscribe(
  async data => {
    //console.log("data recieved",data);
 if(data.message==="Failed"){
  const msg = "Error! Incorrect Email/password Please Try Again. ";
  this.toastService.presentpositiveToast(msg);
  this.loginForm.reset();
   this.loading=false;
   this.clicked=false;
 }
 else{
  this.userid=data.data._id;
   //console.log('recieved user id', this.userid);
this.loginuser();
   
 }
}
 ,
 error => {
      //console.log('recieveing user id err', error);
      console.log("error name",error.name);
      if(error.error.message==="Failed")
 {
  const msg = "User Doen't exists Please Signup First ";
  this.toastService.presenterrorToast(msg);

  this.loading=false;
  this.clicked=false;

 }
 
 else if(error.name==="HttpErrorResponse")
 {
  const msg = "Server is not responding ";
  this.toastService.presenterrorToast(msg);

  this.loading=false;
  this.clicked=false;

 }            
    }
  
  );
}
loginuser(){
 // we need to send this data to our node.js server
 const loginData = this.loginForm.value;
 //console.log('loginData', loginData);
 
 const demail = this.loginForm.value['email'];
 //console.log('demail', demail);

 this.adminService.userLogin(loginData).subscribe(
  data => {
    const token='token';
    const sname='name';
    const semail='email';
    const id="userid";
    //console.log('got response from server', data);
    this.toastService.presentpositiveToast(data.message);
    this.loading = false;
    this.clicked=false;
    this.authService.saveTokenToStorage(id,this.userid);
    this.authService.saveTokenToStorage(token,data.token);
    this.authService.saveTokenToStorage(sname,data.name);
    //to show name and pic on sidemenu
   this.authService.saveTokenToStorage(semail,demail);
   //console.log("shiftin to sidemenu service"); 
   this.sideMenuService.publishSomeData(data);
    //console.log("shiftin to products");
    this.router.navigateByUrl('/home');
  },
  error => {

    this.check  =   "Http failure response for"+ ProjectConfig.getPath()+ " /users/login: 0 Unknown Error" ;
    if(error.message===this.check)
    {
      this.loginForm.reset();
      this.loading = false;
 this.clicked=false;
      console.log('error', error);  
      const mess= "Please Check Your Internet Connection and Try Again ";
      this.toastService.presenterrorToast(mess);
      
    }else{
    this.loginForm.reset()
    this.clicked=false;
    this.loading = false;
    console.log('error', error);
    const msg = "Error! Incorrect Email/password Please Try Again. ";
    this.toastService.presenterrorToast(msg);
  }
}
);
}

save() {   
  const demail = this.loginForm.value['email'];
  //console.log('demail', demail);
    this.getuserid(demail);
    this.clicked = true; 
}
}