import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategeoryService {
 Categeory = [
    { id: '1', name: 'Electronic  Devices' },
    { id: '2', name: 'Electronic Accessories' },
    { id: '3', name: 'TV & Home Appliances' },
    { id: '4', name: 'Mechanical Devices' }, 
    { id: '0', name: 'Others' }
  ];

  subCategeory = [
    { id: '1', name: 'Smart Phones' },
    { id: '1', name: 'Feature Phones' },
    { id: '1', name: 'Tablets' },
    { id: '1', name: 'Landline Phones' },
    { id: '1', name: 'Laptops' },
    { id: '1', name: 'Desktops' },
    { id: '1', name: 'Smart Watches' },
    { id: '1', name: 'Gaming Consoles' },
    { id: '1', name: 'Cameras & Drones' },
    { id: '1', name: 'Security Cameras' },
    { id: '1', name: 'Others' }
    
  ];


  constructor() { }
 
 getCategeory(){
   return this.Categeory;
 }
 getsubCategeory(){
  return this.subCategeory;
}

}
