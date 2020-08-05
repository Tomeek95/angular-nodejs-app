import { Post } from "./post.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class PostsService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();

    getPosts() {
        return [ ...this.posts ];
    }

    addPost(title: string, content: string) {
        const post: Post = { title: title, content: content };
        this.posts.push(post);
        //this way we update the content (like trigering an eventlistener)
        this.postsUpdated.next([ ...this.posts ]);
    }

    getPostUpdateListener() {
        //this is a listener
        return this.postsUpdated.asObservable();
    }
}
