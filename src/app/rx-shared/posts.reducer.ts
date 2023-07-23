import {Action, createReducer, on} from "@ngrx/store";
import {initialState, PostsState} from "./posts.state";
import * as PostActions from "./posts.actions";

export const postsReducer = createReducer(
  initialState,
  on(PostActions.getListOfPostsSuccess, (state, { postList }) => ({
    ...state,
    postList: postList,
    isListLoaded: true
  })),
  on(PostActions.getPostByIdSuccess, (state, { post }) => ({
    ...state,
    loadedPost: post,
  })),
  on(PostActions.deletePostById, (state, { postId }) => ({
      ...state,
      postList: state.postList.filter( post => post.id !== postId)
    })),
  on(PostActions.clearLoadedPost, (state) => ({
    ...state,
    loadedPost: undefined
  })),
  on(PostActions.addPost, (state, { formValue } ) => {
    const updatedPostList = [...state.postList, { ...formValue, id: (state.postList.length + 1).toString()} ]
    return ({
    ...state,
    postList: updatedPostList
  }) }
  ),
  on(PostActions.updatePostById, (state, { postId, formValue }) => {
    const updatedPostIndex = state.postList.findIndex(post => post.id == postId);
    const updatedPostList = [...state.postList.slice(0, updatedPostIndex), { ...formValue, id: postId}, ...state.postList.slice(updatedPostIndex + 1)]
    return ({
      ...state,
      postList: updatedPostList
    }) }
  )
)

export function reducer(state: PostsState | undefined, action: Action) {
  return postsReducer(state, action);
}
