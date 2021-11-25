import { Component, OnInit } from '@angular/core';
import { CreatestoreComponent } from './createstore/createstore.component';
import { AddnewproductComponent } from '../Inventory Module/products/addnewproduct/addnewproduct.component';
import { AlertController, ModalController } from '@ionic/angular';
import { StoresService } from 'src/sdk/core/stores.service';
import { AuthService } from 'src/sdk/core/auth.service';
import { ProjectConfig } from 'src/sdk/Project.config';
import { ProductsService } from 'src/sdk/core/products.service';
import { ToastService } from 'src/sdk/custom/toast.service';
@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {
email
singlestore
store: Store[] = [];
products: Products[] = [];
loading = false;
  deleteLoading = false;
baseimageurl  =   ProjectConfig.getPath()+"//uploadstore//";
baseimageurlpro=ProjectConfig.getPath()+"//uploadproduct//";
  constructor( private toastService:ToastService,
    private authservice:AuthService,
    private productsService:ProductsService,
    private storesService:StoresService, 
    private alertController:AlertController,
    private modalController: ModalController ) { 

    }

  ngOnInit() {
    this.store.length=0;
  this.getdatafromstorage();
  }
  
  getdatafromstorage(){
    const semail='storeemail';
    this.authservice.getTokenFromStorage(semail).then(data => {
       this.email = data;
        //console.log('fetched profile email',this.email);
        this.getStore();
      })
        .catch(error => { console.log('fethching error',error) });
  }

  async getStore(){  
    const observable = await this.storesService.filterStore(this.email);
    observable.subscribe(
   async data => {
     
    this.singlestore=data.data;
    this.store.push(this.singlestore);
        //console.log('store recieved', this.store);

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
async deletestore(stor){
   const observable = await this.storesService.deleteStore(stor._id);
    observable.subscribe(
       data => {
     //console.log('got response from server store deleted successfully', data);
     const msg = "Success! Store Deleted Successfully.";
     this.toastService.presentpositiveToast(msg);
         this.loading=false;
         //optional
         this.ngOnInit();
      }, 
      error => {
        this.loading = false;

        console.log('error in deletion', error);
      }
    )
    
  }

  openEditPopup(store: Store) {
    this.openAddModal(store);
  }

  openEditPopuppro(product: Products) {
    this.openAddModalpro(product);
  }

  async deletestor(store) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: `Are you sure you want to delete the Store "${store.name}"`,
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
            this.deletestore(store);
          }
        }
      ]
    });
    await alert.present();
  }

  async deletepro(product) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: `Are you sure you want to delete the product "${product.name}"`,
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
            this.deleteProduct(product._id);
          }
        }
      ]
    });
    await alert.present();
  }

  async deleteProduct(_id) {
    
    const observable = await this.productsService.deleteProduct(_id);
    observable.subscribe(
      data => {
        //console.log('got response from server', data);
        this.ngOnInit();
      },
      error => {
        console.log('error', error);
      }
    );
  }
  
  
  async getproducts(_id) {
 

    //const observable = await this.productsService.getAllProducts();
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

  addnewproduct(){
    try{
      const store_name="storename";
    const store_id="storeid";
    //console.log("single store before adding",this.singlestore);
    this.authservice.saveTokenToStorage(store_name,this.singlestore.name);
        this.authservice.saveTokenToStorage(store_id,this.singlestore._id);
      }
      catch(err) {
      console.log("saving data to db erro",err);
    }
    this.openAddModalpro();
  }
  

  async openAddModalpro(product?: Products) {

  
  const modal = await this.modalController.create({
      component: AddnewproductComponent,
      componentProps: { product}
    });
    modal.onDidDismiss().then(data => {
      //console.log('dismissed', data);
      this.ngOnInit();
    });
    const store_name="storename";
    const store_id="storeid";
    //console.log("single store before adding",this.singlestore);
    this.authservice.saveTokenToStorage(store_name,this.singlestore.name);
        this.authservice.saveTokenToStorage(store_id,this.singlestore._id);
    
    await modal.present();
  }

  async openAddModal(store?: Store) {
    const modal = await this.modalController.create({
      component: CreatestoreComponent,
      componentProps: { store}
    });
    modal.onDidDismiss().then(data => {
      //console.log('dismissed', data);
      this.ngOnInit();
    });
    await modal.present();
  }
}

// Intefacing is Optional


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

interface Products {
  name: string;
  price: number;
  _id?: string;
  discription: string;
  mainimage:string;
  stock:number;
  image_url:[];
  sellername:string,
  Delivery_Charges:number;
  Orders:[{}];
  store_name:string,
      store_id:string,
  catageory:string;
  Feedback:[{}];
  subCatageory:string;
  is_deleted: boolean;
  email:string;
}