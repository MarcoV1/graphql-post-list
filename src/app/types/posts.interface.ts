import {UserI} from "./user.interface";
import {CommentI} from "./comment.interface";

export interface PostsI {
  id?: string;
  title: string;
  body: string;
  user?: UserI;
  comments?: CommentI;
}
