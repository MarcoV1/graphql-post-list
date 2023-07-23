import {Component, OnDestroy, OnInit} from '@angular/core';
import {clearLoadedPost, getPostById} from "../../rx-shared/posts.actions";
import {Store} from "@ngrx/store";
import {ActivatedRoute} from "@angular/router";
import {PostsI} from "../../types/posts.interface";
import {Observable} from "rxjs";
import {selectLoadedPost} from "../../rx-shared/posts.selectors";

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit, OnDestroy {

  postDetails$: Observable<PostsI | undefined> = this.store.select(selectLoadedPost);

  constructor(private activatedRoute: ActivatedRoute,
              private store: Store) {
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.store.dispatch(getPostById({ postId: id ?? "" }));
  }

  ngOnDestroy() {
    this.store.dispatch(clearLoadedPost());
  }

}
