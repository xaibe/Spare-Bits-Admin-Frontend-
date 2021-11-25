import { Component, OnInit } from '@angular/core';
import { ContactsService } from 'src/sdk/core/contacts.service';
import { AuthService } from 'src/sdk/core/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/sdk/core/user.service';
import { ToastService } from 'src/sdk/custom/toast.service';
import { ProjectConfig } from 'src/sdk/Project.config';
@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {
 currentuser
  contacts
  dubcontacts
  userid_contacts: any[] = [];
  contacted_userid_contacts: any[] = [];
  userid
contact_name
baseimageurl
  constructor(
    private contactsService:ContactsService,
    private authService :AuthService,
    private toastService:ToastService,
    private userService:UserService,
    private router:Router
  ) { }

  ngOnInit() {
    this.getdatafromstorage();
        
    this.baseimageurl  =   ProjectConfig.getPath()+"//uploads//";
  }

  


  

  openchat(contact){
    const room="idforchat"
    this.authService.saveTokenToStorage(room,contact); 
    this.router.navigateByUrl("/chat"); 
  }

  async getAll() {
  
    const observable = await this.contactsService.getAllContacts();
    observable.subscribe(
   async data => {
        this.dubcontacts = data.data.docs;
        
        this.userid_contacts=this.dubcontacts.filter(e=>e.user_id===this.userid);
        this.contacted_userid_contacts=this.dubcontacts.filter(e=>e.contacted_userid===this.userid);
        this.contacts  = this.userid_contacts.concat(this.contacted_userid_contacts);
        
      },
      err => {
        console.log('gett filter err', err);
      }
    );
  }

 async delete(contact){
    const observable = await this.contactsService.deleteContact(contact.roomid);
    observable.subscribe(
   async data => {
    
      this.ngOnInit();
      },
      err => {
        console.log(' error deleting contact ', err);
      }
    );
  }

  

  getdatafromstorage(){
    const id='userid';
    this.authService.getTokenFromStorage(id).then(data => {
     
      this.userid = data;
       
      this.getAll();
      })
      .catch(error => { console.log('fethching error',error) });

      
      const sname='name';
      this.authService.getTokenFromStorage(sname).then(data => {
        this.currentuser = "Admin";
     
      
        })
        .catch(error => { console.log('fethching error',error) });
  }

 
}
