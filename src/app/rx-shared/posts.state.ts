import {PostsI} from "../types/posts.interface";

export interface PostsState {
  postList: PostsI[];
  loadedPost?: PostsI;
  isListLoaded: boolean
}

export const initialState: PostsState = {
  postList: [],
  loadedPost: undefined,
  isListLoaded: false
};
