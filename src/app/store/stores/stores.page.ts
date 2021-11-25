import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/sdk/core/admin.service';
import { StoresService } from 'src/sdk/core/stores.service';
import { ProjectConfig } from 'src/sdk/Project.config';
import { AuthService } from 'src/sdk/core/auth.service';
import { Router } from '@angular/router';
import { alertController } from '@ionic/core';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-stores',
  templateUrl: './stores.page.html',
  styleUrls: ['./stores.page.scss'],
})
export class StoresPage implements OnInit {
  loading = false;
selectedstore
  deleteLoading = false;
  stores;
  emptyarray
  searchArray
storebackup
baseimageurl
  constructor(
    private alertController:AlertController,
    private authService:AuthService,
    private router:Router, 
    private storeService:StoresService
    ) { }

  ngOnInit() {
    this.getallstores();
  }
 async getallstores(){
  const observable = await this.storeService.getAllStores();
  observable.subscribe(
 async data => {
   
  this.stores=data.data.docs;
this.storebackup=data.data.docs;
  //console.log(' stores recieved', this.stores);
      this.baseimageurl  =   ProjectConfig.getPath()+"//uploadstore//";  
    },
    err => {
      console.log('gett filter err', err);
    }
  );
  }
  showproduct(_id){}

  async delete(store) {
    this.selectedstore = store;
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: `Are you sure you want to delete the store"${store.name}"`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: blah => {
            //console.log('Confirm Cancel: blah');
          }
        },
        {
          text: 'Okay',
          handler: () => {
            this.deletestore();
          }
        }
      ]
    });
    await alert.present();
  }

  async deletestore() {
    this.deleteLoading = true;
    const observable = await this.storeService.deleteStore(
      this.selectedstore._id
    );

    observable.subscribe(
      data => {
        //console.log('got response from server', data);
        this.deleteLoading = false;
        this.getallstores();
      },
      error => {
        this.deleteLoading = false;
        console.log('error', error);
      }
    );
  }




openEditPopup(stor){
  const semail='storeemail';
  this.authService.saveTokenToStorage(semail,stor.email);
  this.loading=false;
  this.deleteLoading=false;
  this.router.navigateByUrl("store");

  
}
mySearch(ev:any){
  this.stores=this.storebackup;
  this.emptyarray="";
  const search=ev.target.value;

if(search&& search.trim() !='')
{
this.searchArray=this.stores.filter((item)=>{
  return(item.name.toLowerCase().indexOf(search.toLowerCase())>-1);
})
if (this.searchArray.length == 0) {
   //console.log("empty array",this.searchArray);
   this.emptyarray="Can't Find Any Match ";
   this.stores=this.searchArray;
     this.loading=false;
   }
   
  else{
     this.stores=this.searchArray;
     //console.log("store found",this.stores);
   }
}
else{
//console.log("empty searchbox",search);
this.stores=this.storebackup;
  this.loading=false;

}

}

}
interface Store {
  _id?: string;
  name: string;
  Phone: number;
  Address1:string;
  Address2:string;
  Province:string;
  City:string;
  Zipcode:string;
  catageory:string; 
  subCatageory:string;
  discription: string;
  email:string;
  mainimage:string;
  Feedback:[{}];
  image_url:[];
}

