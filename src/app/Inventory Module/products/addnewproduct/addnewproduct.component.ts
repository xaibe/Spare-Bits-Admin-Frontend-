import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastService } from '../../../../sdk/custom/toast.service';
import { UserService } from '../../../../sdk/core/user.service';
import { AuthService } from '../../../../sdk/core/auth.service';
import { CategeoryService } from '../../../../sdk/custom/categeory.service';
//import { read } from 'fs';

import { ProductsService } from '../../../../sdk/core/products.service';
import { ReturnStatement, TmplAstRecursiveVisitor } from '@angular/compiler';
import { waitForAsync } from '@angular/core/testing';
import { __await } from 'tslib';
@Component({
  selector: 'app-addnewproduct',
  templateUrl: './addnewproduct.component.html',
  styleUrls: ['./addnewproduct.component.scss'],
})
export class AddnewproductComponent implements OnInit {
  email: any;

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private toastservice:ToastService,
  private userservice: UserService,
  private authservice: AuthService,
  private categeoryservice: CategeoryService,
    private toastController: ToastController,
    private productsService: ProductsService,
    private router: Router,
    ) { }

    addNewProductForm: FormGroup;
    loading = false;
    @Input() product;
    urls:string[]=[];
filePresent;
disableBtn: boolean;
a=false;
b=false;
categeorydup:any=[];
categeory:any=[];
subcategeory:any=[];
multipleImages:[]=[];
 store_name
 store_id

    ngOnInit() {
      this.categeory= this.categeoryservice.getCategeory();
      //console.log("categeory",this.categeory);
      //this.subcategeory=this.categeoryservice.getsubCategeory();
    
      this.disableBtn=true;
      this.formInitializer();    
  this.filePresent=false;
  this.getdatafromstorage();


  if (this.product) {
    //console.log('got product', this.product);
    this.addNewProductForm.patchValue(this.product); 
   }
    }

  formInitializer() {
    this.addNewProductForm = this.formBuilder.group({
      _id: [null],
      name:['', [Validators.required, ,Validators.pattern('[a-zA-Z ]*')]],
      price: [null, [Validators.required]],
      discription: [null, [Validators.required]],
      catageory:[null],
      subCatageory:[null],
      email:[],
      stock:[],
      store_name:[],
      store_id:[],
      is_deleted: [false, [Validators.required]],
      image_url:[],
      mainimage:[]
      
    });
  }

  getdatafromstorage(){
    const semail='email';
    this.authservice.getTokenFromStorage(semail).then(data => {
       this.email = data;
       this.addNewProductForm.controls['email'].setValue(this.email);
        //console.log('fetched profile email',this.email);
        this.getstore();
      })
        .catch(error => { console.log('fethching error',error) });
  }

  getstore(){
    const store_name="storename";
const store_id="storeid";
this.authservice.getTokenFromStorage(store_name).then(data => {
  //console.log('fetched data',data);
  this.store_name= data;
  //console.log('fetched store name',this.store_name);
  if(this.store_name!=null){
    this.addNewProductForm.controls['store_name'].setValue(this.store_name);
    
  }
 })
   .catch(error => { console.log('fethching error',error) });
    
   this.authservice.getTokenFromStorage(store_id).then(data => {
    this.store_id= data;
    //console.log('fetched data',data);
    //console.log('fetched store id',this.store_id);
  if(this.store_id!=null){
    this.addNewProductForm.controls['store_id'].setValue(this.store_id);
     //console.log('fetched store id',this.store_id); 
  }
   })
     .catch(error => { console.log('fethching error',error) });
      
  }
  onChange(event){
    //console.log("before onselect",this.subcategeory);
this.subcategeory=this.categeoryservice.getsubCategeory().filter(e=> e.id== event.target.value);
if (this.subcategeory.length == 0) {
  //console.log("empty array",this.subcategeory);
  this.disableBtn=true;
}else{
  this.disableBtn=false;
  //console.log("after onselect",this.subcategeory);
}

}

  async addNew() {
    const cat =this.addNewProductForm.controls['catageory'].value;
this.categeorydup=this.categeory.filter(e=>e.id==cat);
if(this.categeorydup==null){
  //console.log("can't find duplicate");
}else{
  for(var i=0;i<this.categeorydup.length;i++)
  this.addNewProductForm.controls['catageory'].setValue(this.categeorydup[i].name);
  const cata =this.addNewProductForm.controls['catageory'].value;
//console.log("after updating catagory name",cata);
}
    //console.log("catageoryformvalue",cat);
    const scat =this.addNewProductForm.controls['subCatageory'].value;
    //console.log("subcatageoryformvalue",scat);
    
    const observable = await this.productsService.addNewProduct(this.addNewProductForm.value);
    observable.subscribe(
       data => {
      //console.log('got response from server product added successfully', data);
        
        //console.log("addnew subscribe ended");
       this.a=true;
    
       //console.log("value of a in addnew",this.a);
       this.upload();
       
      }, 
      error => {
        this.loading = false;
        this.modalCtrl.dismiss();

        console.log('error in add new', error);
      }
    )
    
  }

  async updateProduct() {
    const observable = await this.productsService.updateProduct(
      this.addNewProductForm.value
    );

    observable.subscribe(
      async data => {
        //console.log('got response from server for update products', data);
        this.upload();
          
        const name = this.addNewProductForm.controls['name'].value;
        const toast = await this.toastController.create({
          message: `${name} has been updated successfully.`,
          duration: 3500
        });
        toast.present();
      },
      error => {
        this.loading = false;
        this.modalCtrl.dismiss();

        console.log('error', error);
      }
    );
  }

  save() {

    if (this.product) {
      this.updateProduct();
    
    } else {
     
    this.addNew();
    
  }
}

     


  async upload(){
    if (this.filePresent==true) {
      //console.log("upload entered");
      const name = this.addNewProductForm.value['name'];
      //console.log("name",name);
      //console.log("email",this.email);
      ////console.log("image file checking before using user service",this.multipleImages);
      //const id = this.getLostData.controls._id;
      
        const observable = await this.productsService.uploadAvatar(
          name, this.email,this.multipleImages
        );
    
        observable.subscribe(
           data => {
            
            
              //console.log('got response from server', data.message);
              if(data.message=="Updated Successfully"||"Created Successfully")
              {
                //console.log("return reached");
               
                this.b=true;
                //console.log("value of b in upload",this.b);
                const msg = "Success! Product added Successfully.";
                this.toastservice.presentpositiveToast(msg);
                    this.loading=false;
                    this.addNewProductForm.reset();
                    //optional
                    this.modalCtrl.dismiss();
                                    
 if (this.store_id==null){
  this.router.navigateByUrl('/products');
   
 } 
 else{
  this.router.navigateByUrl('/store');
 }          
              }
              else{ 
                const messag="Failed! Please check your connection and try again!";
                this.toastservice.presenterrorToast(messag);
                this.loading = false;
              
              }

            
          
       

            },
          error => {
            console.log('error in upload', error);
            const messag="Failed! Please check your connection and try again!";
            this.toastservice.presenterrorToast(messag);
          }
        )
      
       //console.log("upload subscribe ended");
     }
     else
     {
      const mess= "Failed! Please Select an image first and Try Again! ";
      this.toastservice.presenterrorToast(mess);
     }
   }
  

onselect(e){
  this.urls.length = 0;
  const name = this.addNewProductForm.value['name'];
 
  if (e.target.files.length > 4) {
    alert("Only 4 files accepted.");
    e.preventDefault();
}
else
 {
  if(e.target.files){
 
    this.multipleImages = e.target.files;

    //console.log("multiple images before",this.multipleImages);

    for(let j=0; j<e.target.files.length; j++){  
    var reader=new FileReader();
  
    reader.readAsDataURL(e.target.files[j]);
    reader.onload=(events:any)=>{

      this.urls.push(events.target.result);
    };
   
  }
  this.filePresent=true;
}
}
}



  dismiss() {
    if (this.store_id==null){
      this.modalCtrl.dismiss({
        dismissed: true
      });
      this.router.navigateByUrl('/products');
       
     } 
     else{
      this.modalCtrl.dismiss({
        dismissed: true
      });
      this.router.navigateByUrl('/store');
     
    }          
        
    
  }

}
