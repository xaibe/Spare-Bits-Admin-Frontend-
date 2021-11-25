import { AuthService } from './../sdk/core/auth.service';
import { SideMenuService } from './../sdk/core/sidemenu.service';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AlertService } from '../sdk/custom/alert.service';
import { ProjectConfig } from 'src/sdk/Project.config';
import{UserService} from 'src/sdk/core/user.service'
import { ToastService } from '../sdk/custom/toast.service';
import { BehaviorSubject } from 'rxjs';
import { cartService } from 'src/sdk/custom/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  name;
  image;
  userexist = false;
  cartItemCount = new BehaviorSubject(0);
  
  getitemnumber(){
    this.cartItemCount=this.cartService.getCartItemCount();
  };
  public appPages = [
    
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'My Profile',
      url: '/profile',
      icon: 'person'
    },
    {
      title: 'Users',
      url: '/users',
      icon: 'people'
    },
    
    {
      title: 'Products',
      url: '/products',
      icon: 'bookmarks'
    },
    {
      title: 'Stores',
      url: '/stores',
      icon: 'storefront'
    },
    {
      title: 'My Chats',
      url: '/chats',
      icon: 'chatbubbles'
    },
    {
      title: 'Orders',
      url: '/neworder', 
      icon: 'clipboard'
    },
    
    {
      title: 'User Guide',
      url: '/about',
      icon: 'information-circle'
    },
    
    {
      title: 'Log Out',
      icon: 'log-out',
    }
  ];
  fetchedemail: any;
  
  constructor(
    private platform: Platform,
    private sideMenuService:SideMenuService,
    private storage: Storage,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private alertService :AlertService,
    private authService: AuthService,
    private router:Router,
    private userService:UserService,
    private toastService: ToastService,
    private cartService:cartService
  ) { 
    this.initializeApp();
 this.cartItemCount=this.cartService.getCartItemCount();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.storage.clear();
      localStorage.removeItem('name');

    });
  }


  

  ngDoCheck() {

   
    }

    ngOnInit() {
  
      this.sideMenuService.getObservable().subscribe((data) => {
        this.name = data.name;
         try{
          if(data.avatar===null||data.avatar===undefined){
            if(data.name===null||data.name===undefined){
              this.userexist=false;
            }
            this.userexist = true;
          } 
          else{
            this.image = ProjectConfig.getPath() + '/uploads/' + data.avatar;  
               this.userexist = true;
             
            
          }
      }catch(ex){
        console.log("cant find image", ex);
      }
               
    });
        }
    
  ngOnDestroy() {
    this.storage.clear();
    localStorage.removeItem('name');
    this.userexist = false;
  }
  
  logout(){
    this.userexist = false;
    this.name="";
    this.image="";
    const msg="Logged Out Successfully!";
    this.storage.clear();
    localStorage.removeItem('name');
    localStorage.removeItem('avatar');
    this.toastService.presentpositiveToast(msg);
    this.authService.logout();    
  }
  
    
  }
