import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/sdk/core/user.service';
import { LoaderService } from 'src/sdk/custom/loader.service';
import { ProjectConfig } from 'src/sdk/Project.config';
import { AuthService } from 'src/sdk/core/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
users
searchval="3";
dupusers
emptyarray
searchArray
baseimageurl
totalusers
searchph="Search By NAME"; //search placeholder

  constructor(
    private router:Router,
    private authService:AuthService,
    private loaderservice:LoaderService,
    private usersService:UserService,
  ) { }

  ngOnInit() {
  this.getallusers();
  }
async getallusers(){
  this.loaderservice.showHideAutoLoader();
const observable= await this.usersService.getallUsers().
  subscribe(
    data => {
      this.baseimageurl  =   ProjectConfig.getPath()+"//uploads//";
      this.users = data.data.docs;
this.dupusers=data.data.docs;     
      this.totalusers=this.users.length;
      //console.log("data retrieved", this.users);
     
  });
err => {
  console.log("error",err);
};

}

onChange(event){
  //console.log("event value",event.target.value);
  this.searchval=event.target.value;
  //console.log("searchval",this.searchval);
  if(event.target.value==="1"){ 
    this.searchph="Search By ID";
  }else
   if(event.target.value==="2"){
    this.searchph="Search By EMAIL";

  }
  else
   if(event.target.value==="3"){
    this.searchph="Search By NAME";
  }

}


mySearch(ev:any){

 
  this.users=this.dupusers;
  this.emptyarray="";
  const search=ev.target.value;

if(search&& search.trim() !='')
{
  if(this.searchval==="1"){ 
    this.searchArray=this.users.filter((item)=>{
      return(item._id.toLowerCase().indexOf(search.toLowerCase())>-1);
    })
  }else
   if(this.searchval==="2"){
    this.searchArray=this.users.filter((item)=>{
      return(item.email.toLowerCase().indexOf(search.toLowerCase())>-1);
    })
  }
  else
   if(this.searchval==="3"){
    this.searchArray=this.users.filter((item)=>{
      return(item.name.toLowerCase().indexOf(search.toLowerCase())>-1);
    })
  }

if (this.searchArray.length == 0) {
   //console.log("empty array",this.searchArray);
   this.emptyarray="Can't Find Any Match ";
   this.users=this.searchArray;
   }
   
  else{
     this.users=this.searchArray;
     //console.log("User found",this.users);
   }
}
else{
//console.log("empty searchbox",search);
this.users=this.dupusers;
}

}

edituser(email){
  const semail='useremail';
  this.authService.saveTokenToStorage(semail,email);
  this.router.navigateByUrl("/userprofile");
  
}
async deleteuser(_id){
  this.loaderservice.showHideAutoLoader();
const observable= await this.usersService.deleteuser(_id).
  subscribe(
    data => {
      //console.log("user deleted", data);
     
      this.ngOnInit();     
     
  });
err => {
  console.log("error",err);
};

}
 

}
