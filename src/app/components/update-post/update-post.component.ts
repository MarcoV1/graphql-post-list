import {Component, OnDestroy} from '@angular/core';
import {filter, map, Observable,} from "rxjs";
import {PostsI} from "../../types/posts.interface";
import {selectLoadedPost} from "../../rx-shared/posts.selectors";
import {ActivatedRoute} from "@angular/router";
import {Store} from "@ngrx/store";
import {PostsState} from "../../rx-shared/posts.state";
import {clearLoadedPost, getPostById} from "../../rx-shared/posts.actions";

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html'
})
export class UpdatePostComponent implements OnDestroy {
  postDetails$: Observable<PostsI | undefined> = this.store.select(selectLoadedPost).pipe(
    filter(post => !!post),
    map(post => post as PostsI)
  );

  constructor(private activatedRoute: ActivatedRoute,
              private store: Store<PostsState>) {
    this.store.dispatch(getPostById({ postId: this.activatedRoute.snapshot.paramMap.get('id') ?? "" }));
  }

  ngOnDestroy() {
    this.store.dispatch(clearLoadedPost());
  }

}
