import { Component, OnInit } from '@angular/core';
import { ProjectConfig } from 'src/sdk/Project.config';
import { ToastService } from 'src/sdk/custom/toast.service';
import { AuthService } from 'src/sdk/core/auth.service';
import { ProductsService } from 'src/sdk/core/products.service';
import { StoresService } from 'src/sdk/core/stores.service';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from 'src/sdk/core/user.service';
import { ContactsService } from 'src/sdk/core/contacts.service';
@Component({
  selector: 'app-single-store-page',
  templateUrl: './single-store-page.page.html',
  styleUrls: ['./single-store-page.page.scss'],
})
export class SingleStorePagePage implements OnInit {
  email
  singlestore
  products
storeid
  loading = false;
    deleteLoading = false;
  baseimageurl  =   ProjectConfig.getPath()+"//uploadstore//";
  baseimageurlpro=ProjectConfig.getPath()+"//uploadproduct//";

  usermessages = [];
  contacteduser_messages=[];
  seller_imageUrl
  buyer_imageUrl
sellerid
sellername
buyerid
buyername
name
constructor(
  private contactsService:ContactsService,
  private userService:UserService,
  private router:Router, 
      private toastService:ToastService,
      private authservice:AuthService,
      private productsService:ProductsService,
      private storesService:StoresService, 
      private modalController: ModalController ) { 
    }
  ngOnInit() {
this.getstoreid();
this.getdatafromstorage();
  }
 
  chat(email){
this.getsellerid(email);
  }

  async getsellerid( selleremail){
 
    const observable = await this.userService.getSingleUser(selleremail);
    observable.subscribe(
    async data => {
        //console.log('user ', data);
        this.sellerid=data.data._id;
        if(this.sellerid===this.buyerid){
          const message="the user is unable to message himself";
          this.toastService.presenterrorToast(message);
        }else{
     this.sellername=data.data.name;
     this.seller_imageUrl=data.data.imageUrl;
        //console.log('recieved seller id', this.sellerid);
  
     const roomid=this.sellerid+this.buyerid;
     //console.log("created room id",roomid);
     
      const obj={
        roomid:roomid,
        user_id:this.sellerid,
        user_name:this.sellername,
        user_imageUrl:this.seller_imageUrl,
        contacteduser_imageUrl:this.buyer_imageUrl,
        contacted_userid:this.buyerid,
        contacteduser_name:this.buyername,
        user_messages:this.usermessages,
        contacteduser_messages:this.contacteduser_messages
      }
      
  this.createcontact(obj);
  
    //  this.socket.connect();
    //  this.socket.emit('join', this.sellerid);
  
  
      err => {
        console.log('recieveing seller id err', err);
     
             
      }
    }
  }
    );
  }

  async createcontact( obj){
   
    const observable = await this.contactsService.CreateContact(obj);
    observable.subscribe(
    async data => {
        //console.log(' contact tried', data.message);
        const room="idforchat"
      this.authservice.saveTokenToStorage(room,obj);
      this.router.navigateByUrl("/chat");
      err => {
        console.log('  err while creating contact', err);
     
             
      }
    }
    );
  }
  
  async getbuyerid( buyeremail){
 
    const observable = await this.userService.getSingleUser(buyeremail);
    observable.subscribe(
    async data => {
        //console.log('user ', data);
        this.buyerid=data.data._id;
        this.buyername=data.data.name;
     this.buyer_imageUrl=data.data.imageUrl;
        //console.log('recieved buyer id', this.buyerid);
  
      err => {
        console.log('recieveing buyer id err', err);
     
             
      }
    }
    );
  }



  getdatafromstorage(){
    const semail='email';
    this.authservice.getTokenFromStorage(semail).then(data => {
       this.email = data;
        //console.log('fetched profile email',this.email);
this.getbuyerid(this.email);
      })
        .catch(error => { console.log('fethching error',error) });

        const sname='name';
        this.authservice.getTokenFromStorage(sname).then(data => {
           this.name = data;
            //console.log('fetched profile name',this.name);
    
          })
            .catch(error => { console.log('fethching error',error) });
    
      }


 async getstoreid(){
    const store_id="showstore";
    
    this.authservice.getTokenFromStorage(store_id).then(data => {
       this.storeid = data;
        //console.log('fetched store id',this.storeid);
        this.getstore(this.storeid);
      })
        .catch(error => { console.log('fethching store id error',error) });
 
  }

  async getstore(store_id){
    const observable = await this.storesService.getSingleStorebyid(store_id);
    observable.subscribe(
   async data => {
   
    //console.log('data recieved', data);  
    this.singlestore=data.data;
 
   
        //console.log('single store recieved', this.singlestore);
        if(this.singlestore!=null){
          this.getproducts(this.singlestore._id);
     
        }
      },
      err => {
        console.log('gett filter err', err);
      }
    );
  }

  async getproducts(_id){
     const observable = await this.productsService.filterProductbystoreid(_id);
     observable.subscribe(
    async data => {
         this.products = data.data;
         this.loading = false;
         //console.log('Products recieved', this.products);
         
 
       },
       err => {
         console.log('gett filter err', err);
       }
     );
  }
  changeUrl(product) {
    const id = product._id;
    //console.log("product",id);
    const url = `home/${id}`;

    this.router.navigateByUrl(url);
  }
}
