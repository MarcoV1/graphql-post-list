import { Injectable } from '@angular/core';
import {Apollo, ApolloBase, gql} from "apollo-angular";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostsDataHandlerService {
  private apollo: ApolloBase;

  constructor(private apolloProvider: Apollo) {
    this.apollo = this.apolloProvider.use('newClientPosts');
  }


  getPostsList() {
    return this.apollo.watchQuery<any>({
      query: gql`
        {
          posts(options: { paginate: { page: 0, limit: 1000 } } ) {
            data {
              id
              title
              body
              user {
                name
                username
                email
              }
            }
          }
        }
      `,
    }).valueChanges
      .pipe(map( ({data, loading }) => data.posts.data))
  }

  getPostById(id: string) {
    return this.apollo.watchQuery<any>({
      query: gql`
        {
          post(id: ${id}) {
            id
            title
            body
              user {
                name
                email
            }
          }
        }
      `,
    }).valueChanges
      .pipe(map( ({data, loading }) => data.post))
  }

}
