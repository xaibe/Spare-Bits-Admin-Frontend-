import { SideMenuService } from '../../../sdk/core/sidemenu.service';
import { Component, OnInit } from '@angular/core';
import { ProjectConfig } from 'src/sdk/Project.config';
import { AuthService } from '../../../sdk/core/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastService } from '../../../sdk/custom/toast.service';
import { Router } from '@angular/router';
import { LoaderService } from '../../../sdk/custom/loader.service';
import { AlertService } from '../../../sdk/custom/alert.service';
import { Platform } from '@ionic/angular';

import { AdminService } from 'src/sdk/core/admin.service';




@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

imageFile
img
dupimg
userInfo
filepresent
baseimageurl
    dataretrieved: any;
    email: any;

    getProfileData: FormGroup;
    clickedspinner = false;
    clickededit = false;
    calculatedRating: any;

    constructor(
        private adminservice:AdminService,
      
        private toastservice: ToastService,
        private sideMenuService:SideMenuService,
         private router: Router,
         private authService:AuthService,
        private formBuilder: FormBuilder,
        private loaderservice: LoaderService,
        private platform: Platform,
        private alertservice: AlertService) {
        this.loaderservice.showLoader();
    }





    ngOnInit() {
        this.clickedspinner = false;
        this.clickededit = false;
        this.formInitializer();
        setTimeout(() => {
                 this.getdatafromstorage();
             }, 1000);
        
     
    }

    onselect(e){

        this.imageFile=e.target.files[0];
        this.userInfo = this.imageFile.name.split('.').pop();
          //console.log(" image extension",this.userInfo);
var reader=new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload=(events:any)=>{

        this.img = events.target.result;
    };
    this.filepresent=true;      
}    


uploadImage(){
    
    if (this.filepresent===true) {
      //console.log("userservice");
this.userInfo="jpeg";
      //console.log("userinfo",this.userInfo);
      //console.log("image file checking before using user service",this.imageFile);
      //const id = this.getLostData.controls._id;
      this.adminservice.uploadAvatar(this.userInfo, this.email,this.imageFile)
        .subscribe(  
      
            data => {
              //console.log('got response from server', data.message);
              if(data.message=="Updated Successfully"||"Created Successfully")
              {
                const msg = "Success! Profile Updated Successfully.";
                 
                this.toastservice.presentpositiveToast(msg); 
                this.clickedspinner = false;
            this.authService.logout();
                //   this.router.navigateByUrl("/home");

              }
              else{ 
                const messag="Failed! Please check your connection and try again!";
                this.toastservice.presenterrorToast(messag);
                this.clickedspinner = false;        
              }

            },
          error => {
            console.log('error', error);
            const messag="Failed! Please check your connection and try again!";
            this.toastservice.presenterrorToast(messag);
            this.clickedspinner = false;
          }
        );
     }
     else
     {
      const mess= "Failed! Please Select an image first and Try Again! ";
      this.toastservice.presenterrorToast(mess);
      this.clickedspinner = false;
     }
   }

    getdatafromstorage(){
        const semail='email';
        this.authService.getTokenFromStorage(semail).then(data => {
          
            this.email = data;
            //console.log('fetched profile email',this.email);   
            this.subscrib(this.email);
      
          })
            .catch(error => { console.log('fethching error',error) });
    }

    subscrib(email: string) {
        this.adminservice.getSingleUser(email).subscribe(
            userdata => {
                this.dataretrieved = userdata;
                //console.log("data retrieved", this.dataretrieved);
                
                this.baseimageurl  =   ProjectConfig.getPath()+"//uploads//";
                this.img=this.dataretrieved.data.avatar;
                this.dupimg=this.dataretrieved.data.avatar;
                this.loaderservice.hideLoader();


            });
        err => {
            console.log("api error in all request retrieval", err);
            this.alertservice.presentAlertConfirm("Server Down! Please retry", "Error!");
            this.loaderservice.hideLoader();
        };

    }
    

    ngAfterViewInit() {
    }

    formInitializer() {
        this.getProfileData = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            mnumber:['', [Validators.required, Validators.minLength(11)]],
            rating: ['', Validators.required],
            count: ['', Validators.required]
        });
    }


    editclicked() {

        this.clickededit = true;
    }

    
    update() {
        var number=Number(this.getProfileData.value.mnumber);
           this.clickedspinner = true;
           
           if (this.dataretrieved.data.email===this.getProfileData.value.email &&
                this.dataretrieved.data.mnumber===number &&
                 this.dataretrieved.data.name===this.getProfileData.value.name  
                               ){
                   if(this.img===this.dupimg){
                       const msg = "Failed! Please Update Info & Try Again ";
                       this.toastservice.presenterrorToast(msg); 
                       this.clickedspinner = false;
               //console.log("no change in the data");
                   }
                   else{
                       this.uploadImage();
                   }
           }
   
           else{
   
               
           try {
               const getpdata = this.getProfileData.value;
               //console.log("profile update form data",getpdata);
               //console.log("profile email for update",this.email);
               this.adminservice.UpdateUser(getpdata, this.email).subscribe(
                   data => {
                       if(this.img===this.dupimg){
                           const msg = "Success! Profile Updated Successfully.";
                    
                           this.toastservice.presentpositiveToast(msg); 
                           this.clickedspinner = false;
                           //console.log('got response from server', data);
                           this.authService.logout(); 
                        }
                       else{
                           this.uploadImage();
                       }
                   },
                   error => {
                       console.log('error', error);
                       this.alertservice.presentAlertConfirm("Cannot Post Data right!", "Failed!");
                       this.clickedspinner = false;
                   }
               );
           } catch (ex) {
               console.log('ex', ex);
           }
       }
           }
   }
   
