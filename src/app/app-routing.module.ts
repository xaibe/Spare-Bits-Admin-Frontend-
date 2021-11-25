import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { IsLoginGuard } from './../sdk/custom/guards/islogin.guard';
import { NgModule } from '@angular/core';
import { RedirectLoginGuard } from './../sdk/custom/guards/redirectlogin.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    children: [
      {
        path: '',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
      },
      {
        path: ':_id',
         
        loadChildren: () => import('./Inventory Module/singleproduct/singleproduct.module').then(m => m.SingleproductPageModule)
      }
    ]
  },

  {
    path: 'home',
    canActivate: [IsLoginGuard],
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'login',
    canActivate: [RedirectLoginGuard],
    loadChildren: () =>
      import('./Manage Profile Module/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'forgotpassword',
    loadChildren: () => 
    import('./Manage Profile Module/password reset/forgotpassword/forgotpassword.module').then( m => m.ForgotpasswordPageModule)
  },
  {
    path: 'changepassword',
    loadChildren: () => 
    import('./Manage Profile Module/password reset/changepassword/changepassword.module').then( m => m.ChangepasswordPageModule)
  },
  {
    path: 'verifyEmail',
    loadChildren: () => 
    import('./Manage Profile Module/password reset/verifyemail/verifyemail.module').then( m => m.VerifyemailPageModule)
  },
  {
    path: 'profile',
    canActivate: [IsLoginGuard],
    loadChildren: () => import('./Manage Profile Module/profile/profile.module').then( m => m.ProfilePageModule)
  },   
  {
    path: 'products',
    canActivate: [IsLoginGuard],
    loadChildren: () => 
    import('./Inventory Module/products/products.module').then( m => m.ProductsPageModule)
  },
  {
    path: 'singleproduct',
    canActivate: [IsLoginGuard],
    loadChildren: () => import('./Inventory Module/singleproduct/singleproduct.module').then( m => m.SingleproductPageModule)
  },
  {
    path: 'cart',
    canActivate: [IsLoginGuard],
    loadChildren: () => import('./Inventory Module/cart/cart.module').then( m => m.CartPageModule)
  },
  {
    path: 'checkout',
    canActivate: [IsLoginGuard],
    loadChildren: () => import('./Checkout Module/checkout/checkout.module').then( m => m.CheckoutPageModule)
  },
  {
    path: 'easypaisa',
    canActivate: [IsLoginGuard],
    loadChildren: () => import('./Checkout Module/easypaisa-page/easypaisa-page.module').then( m => m.EasypaisaPagePageModule)
  },
  {
    path: 'finalpage',
    canActivate: [IsLoginGuard],
    loadChildren: () => import('./Checkout Module/finalpage/finalpage.module').then( m => m.FinalpagePageModule)
  },
  {
    path: 'orders',
    canActivate: [IsLoginGuard],
    loadChildren: () => import('./Inventory Module/orders/orders.module').then( m => m.OrdersPageModule)
  },
  {
    path: 'neworder',
    canActivate: [IsLoginGuard],
    loadChildren: () => import('./Inventory Module/orders/new-orders/new-orders.module').then( m => m.NewOrdersPageModule)
  },
  {
    path: 'chat',
    canActivate: [IsLoginGuard],
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'chats',
    canActivate: [IsLoginGuard],
    loadChildren: () => import('./chat/chats/chats.module').then( m => m.ChatsPageModule)
  },
  {
    path: 'store',
    canActivate: [IsLoginGuard],
    loadChildren: () => import('./store/store.module').then( m => m.StorePageModule)
  },
  {
    path: 'stores',
    canActivate: [IsLoginGuard],
    loadChildren: () => import('./store/stores/stores.module').then( m => m.StoresPageModule)
  },
  {
    path: 'singlestorepage',
    canActivate: [IsLoginGuard],
    loadChildren: () => import('./store/single-store-page/single-store-page.module').then( m => m.SingleStorePagePageModule)
  },
  {
    path: 'userprofile',
    canActivate: [IsLoginGuard],
    loadChildren: () => import('./Manage Profile Module/users-profile/users-profile.module').then( m => m.UsersProfilePageModule)
  },
  {
    path: 'users',
    canActivate: [IsLoginGuard],
    loadChildren: () => import('./Manage Profile Module/users/users.module').then( m => m.UsersPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
