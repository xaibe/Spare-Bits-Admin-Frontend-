import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  fetchedData: any;
  constructor(private storage: Storage, private router: Router) {}

  //public saveTokenToStorage( token: string) {
    //this.storage.set('token', token);
 // }

  
  public saveTokenToStorage( name:string ,token: string) {
    this.storage.set(name, token);
  }

public SetItemtoStorage(name:string,auth:string){
  //localStorage.setItem('token', 'mytoken');
  localStorage.setItem(name,auth);
}

public async getItemFromStorage(name:string){
  return await this.storage.get(name);
}
  public async getTokenFromStorage(name:string) {
    return await this.storage.get(name);
  }
  public async removeTokenFromStorage(name:string) {
    return await this.storage.remove(name);
  }
public clearLocalStorage()
{
  this.storage.clear();
}
  public async logout() {
    this.storage.clear();
    this.router.navigateByUrl('/login');
  }
}
