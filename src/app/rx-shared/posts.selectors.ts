import {createFeatureSelector, createSelector} from "@ngrx/store";
import {PostsState} from "./posts.state";

export const selectPosts = createFeatureSelector<PostsState>("posts");

export const selectPostList = createSelector(
  selectPosts,
  (state: PostsState) => state.postList
);

export const selectLoadedPost = createSelector(
  selectPosts,
  (state: PostsState) =>
    state?.loadedPost ? state.loadedPost : undefined
);

export const isListLoaded = createSelector(
  selectPosts,
  (state: PostsState) =>
    state?.isListLoaded
);
