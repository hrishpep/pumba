import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RouteGuard } from './RouteGuard'

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'mytest',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule),
    canActivate: [RouteGuard]
  },
  {
    path: 'mytest',
    loadChildren: () => import('./mytest/mytest.module').then( m => m.MytestPageModule),
    canActivate: [RouteGuard]
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'editor',
    loadChildren: () => import('./editor/editor.module').then( m => m.EditorPageModule)
  },
  {
    path: 'observations',
    loadChildren: () => import('./observations/observations.module').then( m => m.ObservationsPageModule)
  },
  {
    path: 'mytest',
    loadChildren: () => import('./mytest/mytest.module').then( m => m.MytestPageModule)
  },
  {
    path: 'vpkprofile',
    loadChildren: () => import('./vpkprofile/vpkprofile.module').then( m => m.VpkprofilePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
