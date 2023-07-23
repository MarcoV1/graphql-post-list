import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import {AppRoutingModule} from "./app-routing.module";
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { HttpClientModule } from '@angular/common/http';
import {HttpLink} from "apollo-angular/http";
import {InMemoryCache} from "@apollo/client/core";
import {APOLLO_NAMED_OPTIONS, ApolloModule, NamedOptions} from "apollo-angular";
import {postsReducer, reducer} from "./rx-shared/posts.reducer";
import {PostsEffects} from "./rx-shared/posts.effects";
import {EffectsModule} from "@ngrx/effects";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import { PostDetailsComponent } from './components/post-details/post-details.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import { UpdatePostComponent } from './components/update-post/update-post.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    PostsListComponent,
    CreatePostComponent,
    PostDetailsComponent,
    UpdatePostComponent,
    PostFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ApolloModule,
    AppRoutingModule,
    StoreModule.forRoot({
      posts: postsReducer,
    }),
    EffectsModule.forRoot([PostsEffects]),
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: APOLLO_NAMED_OPTIONS,
      useFactory(httpLink: HttpLink): NamedOptions {
        return {
          newClientPosts: {
            cache: new InMemoryCache(),
            link: httpLink.create({
              uri: 'https://graphqlzero.almansi.me/api',
            }),
          },
        };
      },
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
