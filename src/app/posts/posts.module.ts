import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PostsListComponent } from './posts-list.component';
import { PostDetailComponent } from './post-detail.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { path: '', component: PostsListComponent },
  { path: ':id', component: PostDetailComponent },
];

@NgModule({
  declarations: [PostsListComponent, PostDetailComponent],
  imports: [CommonModule, FormsModule, SharedModule, RouterModule.forChild(routes)]
})
export class PostsModule {}