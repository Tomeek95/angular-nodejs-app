import { mimeType } from "./mime-type.validators";
import { Post } from "./../post.model";
import { PostsService } from "./../posts.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
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
    form: FormGroup;
    imagePreview: string;
    private mode = "create";
    private postId: string = null;

    constructor(public postsService: PostsService, public route: ActivatedRoute) {}

    ngOnInit() {
        //form initalization
        //FormGroup and FormControl are constructors of ANgular core
        this.form = new FormGroup({
            title: new FormControl(null, {
                validators: [ Validators.required, Validators.minLength(3) ]
            }),
            content: new FormControl(null, { validators: [ Validators.required ] }),
            image: new FormControl(null, {
                validators: [ Validators.required ],
                asyncValidators: [ mimeType ]
            })
        });
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
                        content: postData.content,
                        imagePath: postData.imagePath
                    };
                    this.form.setValue({
                        title: this.post.title,
                        content: this.post.content,
                        imagePath: this.post.imagePath
                    });
                });
                console.log(this.post);
            } else {
                this.mode = "create";
                this.postId = null;
            }
        });
    }

    onImagePicked(event: Event) {
        //with ts, we have to specify that we are assuming a file as an input,
        //so we have to cast event.target to an HTMLInputElement
        //only 1 file can be selected
        const file = (event.target as HTMLInputElement).files[0];
        this.form.patchValue({ image: file }); // this is a file object
        this.form.get("image").updateValueAndValidity(); // this method is checking the validity of the file
        const reader = new FileReader();
        //this is async code, might take a while to process
        //this is why we are using a callback
        reader.onload = () => {
            this.imagePreview = reader.result as string;
        };
        reader.readAsDataURL(file);
    }

    onSavePost() {
        if (this.form.invalid) {
            return;
        }
        this.isLoading = true;
        if (this.mode === "create") {
            this.postsService.addPost(
                this.form.value.title,
                this.form.value.content,
                this.form.value.image
            );
        } else {
            this.postsService.updatePost(
                this.postId,
                this.form.value.title,
                this.form.value.content,
                this.form.value.imagePath
            );
        }
        this.form.reset();
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
