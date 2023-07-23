import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {deletePostById, getListOfPosts} from "../../rx-shared/posts.actions";
import {Store} from "@ngrx/store";
import {isListLoaded, selectPostList} from "../../rx-shared/posts.selectors";
import {BehaviorSubject, combineLatest, debounceTime, filter, take, takeWhile} from "rxjs";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {PostsI} from "../../types/posts.interface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit, OnDestroy {
  inView = true
  displayedColumns: string[] = ['title', 'username', "email", 'actions'];
  dataSource: MatTableDataSource<PostsI> = new MatTableDataSource<PostsI>([]);

  currentPageIndexAndSize$ = new BehaviorSubject([0, 5]);
  currentSearch$ = new BehaviorSubject("");

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private store: Store, private router: Router) { }

  ngOnInit() {
    this.store.select(isListLoaded).pipe(take(1)).subscribe(isLoaded => {
      if (!isLoaded) this.store.dispatch(getListOfPosts());
    })
    this.loadPostsDataToTable();
  }

  ngOnDestroy() {
    this.inView = false;
  }

  loadPostsDataToTable() {
    combineLatest([
      this.store.select(selectPostList),
      this.currentSearch$
    ])
      .pipe(takeWhile(() => this.inView),
        debounceTime(200),
        filter( ([postList, search]) => !!postList)
      )
      .subscribe( ([postList, search]) => {
        this.dataSource = new MatTableDataSource(postList.filter(post =>
          post.title.includes(search) || post?.user?.name.includes(search) || post?.user?.email.includes(search)));
        this.dataSource.paginator = this.paginator;
      });
  }

  onSearchChanged(search: any) {
    this.currentSearch$.next(search?.value);
  }

  onViewButtonClicked(item: PostsI) {
    this.router.navigate(['/details', item.id]);
  }

  onUpdateButtonClicked(item: PostsI) {
    this.router.navigate(['/update', item.id]);
  }

  onDeleteButtonClicked(post: PostsI) {
    this.store.dispatch(deletePostById( { postId: post.id ?? "" }));
  }

  handlePageEvent(event: PageEvent) {
    this.currentPageIndexAndSize$.next([event.pageIndex, event.pageSize]);
  }
}
