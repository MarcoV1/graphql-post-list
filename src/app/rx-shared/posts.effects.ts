import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, of, switchMap} from "rxjs";
import * as PostActions from "./posts.actions";
import {Injectable} from "@angular/core";
import {PostsDataHandlerService} from "../services/posts-datahandler.service";

@Injectable()
export class PostsEffects {

  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.getListOfPosts.type, PostActions.getListOfPosts),
      switchMap(() =>
        this.postsDataHandlerService.getPostsList().pipe(
          map((result) => PostActions.getListOfPostsSuccess({ postList: result })),
          catchError((error) =>
            of(PostActions.getListOfPostsFailed({ error: error }))
          )
        )
      )
    )
  );

  loadPostDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.getPostById.type, PostActions.getPostById),
      switchMap((action) =>
        this.postsDataHandlerService.getPostById(action.postId).pipe(
          map((result) => PostActions.getPostByIdSuccess({ post: result })
          ),
          catchError((error) =>
            of(PostActions.getPostByIdFailed({ error: error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private postsDataHandlerService: PostsDataHandlerService
  ) {}
}
