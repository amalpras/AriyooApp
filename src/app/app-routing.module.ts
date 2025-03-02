import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeModule } from './home/home.module';
import { ChatComponent } from './chat/chat.component';
import { ProfileComponent } from './profile/profile.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { ForgotPasswordComponent } from './forgotpassword/forgotpassword.component';

const routes: Routes = [
  { path: 'chat', component : ChatComponent},
  {path: 'login', component: LoginComponent},
  {path : 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: '', component: NewsletterComponent},
  { 
    path: 'home', 
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: '**', redirectTo: '' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
