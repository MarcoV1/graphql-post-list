import {createAction, props} from "@ngrx/store";
import {PostsI} from "../types/posts.interface";

export const ACTION_TYPES = {
  LIST_POST_SUCCESS: "[Posts List] Get Posts Success",
  GET_POST_SUCCESS: "[Post ] Get Post Success"
}

export const getListOfPosts = createAction(
  "[Posts List] Get Posts");

export const getListOfPostsSuccess = createAction(
  ACTION_TYPES.LIST_POST_SUCCESS,
  props<{ postList: PostsI[] }>()
);

export const getListOfPostsFailed = createAction(
  "[Posts List] Get Posts Failed",
  props<{ error: any }>()
);

export const getPostById = createAction(
  "[Post] Get Post",
  props<{ postId: string }>()
);

export const getPostByIdSuccess = createAction(
  ACTION_TYPES.GET_POST_SUCCESS,
  props<{ post: PostsI }>()
);

export const getPostByIdFailed = createAction(
  "[Post] Get Post Failed",
  props<{ error: any }>()
);

// no call to the service for this one, since we can't actually delete from their database
export const deletePostById = createAction(
  "[Post] Delete Post",
  props<{ postId: string }>()
);

export const addPost = createAction(
  "[Post] Add Post",
  props<{ formValue: PostsI }>()
);

export const updatePostById = createAction(
  "[Post] Update Post",
  props<{ postId: string, formValue: any }>()
);

export const clearLoadedPost = createAction(
  "[Post] Clear Post Data",
);
