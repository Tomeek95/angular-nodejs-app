import { Post } from "./../post.model";
import { PostsService } from "./../posts.service";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";

//decorator that is needed for every ts file, scince it marks it that way
//here templates have to be defined (html)
@Component({
    selector: "app-post-create",
    templateUrl: "./post-create.component.html",
    styleUrls: [ "./post-create.component.scss" ]
})
export class PostCreateComponent implements OnInit {
    enteredTitle = "";
    enteredContent = "";
    post: Post;
    isLoading = false;
    private mode = "create";
    private postId: string = null;

    constructor(public postsService: PostsService, public route: ActivatedRoute) {}

    ngOnInit() {
        //param map is an observable
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has("postId")) {
                this.mode = "edit";
                this.postId = paramMap.get("postId");
                this.isLoading = true;
                console.log(this.isLoading);
                this.postsService.getPost(this.postId).subscribe((postData) => {
                    this.isLoading = false;
                    this.post = {
                        id: postData._id,
                        title: postData.title,
                        content: postData.content
                    };
                });
                console.log(this.post);
            } else {
                this.mode = "create";
                this.postId = null;
            }
        });
    }

    onSavePost(form: NgForm) {
        if (form.invalid) {
            return;
        }
        this.isLoading = true;
        if (this.mode === "create") {
            this.postsService.addPost(form.value.title, form.value.content);
        } else {
            this.postsService.updatePost(this.postId, form.value.title, form.value.content);
        }
        form.reset();
    }

    errMessageHandler(err: string) {
        if (err === "title") {
            return "Please fill out the input field with a title of the desired post!";
        }
        if (err === "content") {
            return "Please fill out the text-area with the content of the desired post!";
        }
        return "";
    }
}

/*
property Binding,
event binding
2-way binding
*/
