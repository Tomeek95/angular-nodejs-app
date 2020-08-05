import { PostsService } from "./../posts.service";
import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

//decorator that is needed for every ts file, scince it marks it that way
//here templates have to be defined (html)
@Component({
    selector: "app-post-create",
    templateUrl: "./post-create.component.html",
    styleUrls: [ "./post-create.component.scss" ]
})
export class PostCreateComponent {
    enteredTitle = "";
    enteredContent = "";

    constructor(public postsService: PostsService) {}

    onAddPost(form: NgForm) {
        if (form.invalid) {
            return;
        }
        this.postsService.addPost(form.value.title, form.value.content);
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
