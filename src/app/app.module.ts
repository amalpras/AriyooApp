import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginComponent } from './login/login.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatOption, MatOptionModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { ChatwindowComponent } from './chatwindow/chatwindow.component';
import { RegisterComponent } from './register/register.component';
import { ChatComponent } from './chat/chat.component';
import { ProfileComponent } from './profile/profile.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { SharedModule } from "./shared/shared.module";
import { ForgotPasswordComponent } from './forgotpassword/forgotpassword.component';
import { UserService } from './services/user.service';
import { TagsService } from './services/tags.service';
import { RequestInterceptor } from './core/interceptors/request.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatwindowComponent,
    RegisterComponent,
    ChatComponent,
    ProfileComponent,
    NewsletterComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule, // Add HttpClientModule here
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatChipsModule,
    SharedModule
  ],
  providers: [
    HttpClientModule,
    UserService,
    TagsService,
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
