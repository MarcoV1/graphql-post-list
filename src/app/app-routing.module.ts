import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {PostsListComponent} from "./components/posts-list/posts-list.component";
import {CreatePostComponent} from "./components/create-post/create-post.component";
import {PostDetailsComponent} from "./components/post-details/post-details.component";
import {UpdatePostComponent} from "./components/update-post/update-post.component";

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {path : 'list', component : PostsListComponent},
  {path : 'create', component : CreatePostComponent},
  {path : 'details/:id', component : PostDetailsComponent},
  {path : 'update/:id', component : UpdatePostComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
