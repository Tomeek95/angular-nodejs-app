import { HttpClient } from "@angular/common/http";
import { Post } from "./post.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class PostsService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();

    //service injection by addding httpClient to the parameters that is binded to a private property
    constructor(private http: HttpClient) {}

    getPosts() {
        //the get trhe responce you have to listen / subscribe
        //unsucscribe is not necesary since it will be handled by Angular (http-client)
        //in the get method: at the response's body we get back the response data, that has to be specified
        //get methods also converts json back to js format
        this.http
            .get<{ message: string; posts: Post[] }>("http://localhost:3000/api/posts")
            .subscribe((postData) => {
                this.posts = postData.posts;
                this.postsUpdated.next([ ...this.posts ]);
            });
    }

    addPost(title: string, content: string) {
        const post: Post = { id: null, title: title, content: content };
        //this way we update the content
        this.posts.push(post);
        //this way we  inform the app about this update (like trigering an eventlistener)
        this.postsUpdated.next([ ...this.posts ]);
    }

    getPostUpdateListener() {
        //this is a listener
        return this.postsUpdated.asObservable();
    }
}
