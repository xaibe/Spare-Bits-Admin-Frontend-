import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { ProjectConfig } from '../Project.config';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  constructor(private http: HttpClient, private authService: AuthService) {}
  
public async getAllContacts(): Promise<any> {
    const atoken='token';
    const url = ProjectConfig.getPath() + '/Contacts/';
    const token = await this.authService.getTokenFromStorage(atoken);
    return this.http.get(url, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public async CreateContact(data:object): Promise<any> {
    const atoken='token';
    const url = ProjectConfig.getPath() + '/Contacts/add';
    const token = await this.authService.getTokenFromStorage(atoken);
    
    return this.http.post(url, data,{
      headers: new HttpHeaders().set('Authorization', token)
    });
  }

  public async updateMessages(data,_id): Promise<any> {
    const atoken='token';
    const url = ProjectConfig.getPath() + '/Contacts/'+ _id;
    const token = await this.authService.getTokenFromStorage(atoken);
    
    return this.http.put(url, data,{
      headers: new HttpHeaders().set('Authorization', token)
    });
  }
  
  public async deleteContact(id): Promise<any> {
    const atoken='token';
    const url = ProjectConfig.getPath() + `/Contacts/${id}`;
    const token = await this.authService.getTokenFromStorage(atoken);

    return this.http.delete(url, {
      headers: new HttpHeaders().set('Authorization', token)
    });
  }
 
}