import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {PostsI} from "../../types/posts.interface";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {addPost, updatePostById} from "../../rx-shared/posts.actions";
import {Router} from "@angular/router";

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnChanges {
  @Input() addingNewPost = true;
  @Input() postToUpdate: any;

  form: FormGroup = new FormGroup({});
  submitted = false;

  constructor(private formBuilder: FormBuilder, private store: Store, private router: Router) {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["postToUpdate"] && !!this.postToUpdate) {
      this.buildForm(this.postToUpdate)
    }
  }

  buildForm(post?: PostsI) {
    this.form = this.formBuilder.group(
      {
        title: [post?.title ? post?.title : "", Validators.required],
        body: [post?.body ? post?.body : "", Validators.required]
      })
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    if (this.addingNewPost) this.store.dispatch(addPost({formValue: this.form.value}));
    else if (this.postToUpdate) this.store.dispatch(updatePostById({ postId: this.postToUpdate?.id, formValue: this.form.value}));
    this.router.navigate(['/list']);
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

}
