
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastcontroller:ToastController) { }

  //toast
  async presenterrorToast(msg) {
    const toast = await this.toastcontroller.create({
    message: msg, 
    //color: 'danger',
    position: 'bottom',
    cssClass: 'errorToast',
    duration: 3500,
    buttons: [
      { 
        side: 'end',
        text: 'Okay',
        role: 'cancel',
        handler: () => {
          //console.log('Cancel clicked');
        }
      }
    ]
   });
    toast.present();
  }


  async presentpositiveToast(msg) {
    const toast = await this.toastcontroller.create({
    message: msg, 
    
    position: 'bottom',
    cssClass: 'positiveToast',
    duration: 500,
    
   });
    toast.present();
  }

  async presentToastWithOptions(msg) {
    const toast = await this.toastcontroller.create({
      header: 'Toast header',
      message: msg,
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'star',
          text: 'Favorite',
          handler: () => {
            //console.log('Favorite clicked');
          }
        }, {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

}
