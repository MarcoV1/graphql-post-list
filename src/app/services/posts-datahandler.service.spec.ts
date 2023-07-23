import { TestBed } from '@angular/core/testing';

import { PostsDatahandlerService } from './posts-datahandler.service';

describe('PostsDatahandlerService', () => {
  let service: PostsDatahandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostsDatahandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
