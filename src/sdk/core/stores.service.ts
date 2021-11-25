import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from './auth.service';
import { ProjectConfig } from '../Project.config';
import { Injectable } from '@angular/core';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';

@Injectable({
  providedIn: 'root'
})
export class StoresService {
  constructor(private http: HttpClient, private authService: AuthService) {}
  
  public async getAllStores(): Promise<any> {
    const atoken='token';
    const url = ProjectConfig.getPath() + '/Stores/';
    const token = await this.authService.getTokenFromStorage(atoken);
    return this.http.get(url, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public async filterStore(email): Promise<any> {    
    const atoken='token';
    const token = await this.authService.getTokenFromStorage(atoken);
    const url = ProjectConfig.getPath() + '/Stores/' + email;
    return this.http.get(url,{
      headers: new HttpHeaders().set('Authorization', token)
    }); 
  } 

  
  public async getSingleStorebyid(_id): Promise<any> {
    const atoken='token';
    const url = ProjectConfig.getPath() + '/Stores/getSingleStore/'+_id;
    const token = await this.authService.getTokenFromStorage(atoken);

    return this.http.get(url, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public async feedback(name,data): Promise<any> {
    const atoken='token';
    const token = await this.authService.getTokenFromStorage(atoken);
    const url = ProjectConfig.getPath() + '/Stores/' + name ;
   
    return this.http.post(url, data,{
      headers: new HttpHeaders().set('Authorization', token)
    }); 
  }

  public async addNewStore(data:object): Promise<any> {
    const atoken='token';
    const url = ProjectConfig.getPath() + '/Stores/add';
    const token = await this.authService.getTokenFromStorage(atoken);
    
    return this.http.post(url, data,{
      headers: new HttpHeaders().set('Authorization', token)
    });
  }
  public async updateStore(data): Promise<any> {
    const atoken='token';
    const url = ProjectConfig.getPath() + `/Stores/${data._id}`;
     const token = await this.authService.getTokenFromStorage(atoken);
    //const token = 'blabla';
    return this.http.put(url, data, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }
  public async deleteStore(id: string): Promise<any> {
    const atoken='token';
    const url = ProjectConfig.getPath() + `/Stores/${id}`;
    const token = await this.authService.getTokenFromStorage(atoken);

    return this.http.delete(url, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }
  
  public async uploadAvatar(name: any ,email:any, image: any  /* user_id: any*/): Promise<any> {
    // /user/avatar/${user_id}
    const atoken='token';
    const token = await this.authService.getTokenFromStorage(atoken);
const extension="png";
    var file_location;
    var url;  
  
    
       url = ProjectConfig.getPath() + '/Stores/uploadimage';
    const formData: FormData = new FormData();
     for (let img of image){
      //console.log("img",img);
      file_location = `${name}.${email}.${img.name}`;  
      //console.log("filename",file_location);
      formData.append('files', img,file_location);
    }   
    //console.log("formdata",formData);
      return this.http.post(url, formData,{
        headers: new HttpHeaders().set('Authorization', token)
      });
    // return this.http.post(url, formData, {
    //   headers: new HttpHeaders().set('Authorization', token)
    // });
    // return this.http.post(url, obj)
  
}

}