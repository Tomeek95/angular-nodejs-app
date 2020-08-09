import { HttpClient } from "@angular/common/http";
import { Post } from "./post.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class PostsService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();

    //service injection by addding httpClient to the parameters that is binded to a private property
    constructor(private http: HttpClient, private router: Router) {}

    getPostUpdateListener() {
        //this is a listener
        return this.postsUpdated.asObservable();
    }

    getPosts() {
        //the get trhe responce you have to listen / subscribe
        //unsucscribe is not necesary since it will be handled by Angular (http-client)
        //in the get method: at the response's body we get back the response data, that has to be specified
        //get methods also converts json back to js format
        this.http
            .get<{ message: string; posts: any }>("http://localhost:3000/api/posts")
            .pipe(
                map((postData) => {
                    return postData.posts.map((post) => {
                        return {
                            id: post._id,
                            title: post.title,
                            content: post.content,
                            imagePath: post.imagePath
                        };
                    });
                })
            ) //The first map is a RxJS map function for transforming each event of a stream
            .subscribe((transformedPosts) => {
                this.posts = transformedPosts;
                this.postsUpdated.next([ ...this.posts ]);
            });
    }

    getPost(id: string) {
        return this.http.get<{ _id: string; title: string; content: string }>(
            "http://localhost:3000/api/posts/" + id
        );
    }

    addPost(title: string, content: string, image: File) {
        const postData = new FormData();
        postData.append("title", title);
        postData.append("content", content);
        postData.append("image", image, title);
        //before uploading image
        //const post: Post = { id: null, title: title, content: content };

        //angular http client detects that we are not just sending json, and handles it
        this.http
            .post<{ message: string; post: Post }>("http://localhost:3000/api/posts", postData)
            .subscribe((responseData) => {
                const post: Post = {
                    id: responseData.post.id,
                    title: title,
                    content: content,
                    imagePath: responseData.post.imagePath
                };
                //this way we update the content
                this.posts.push(post);
                //this way we  inform the app about this update (like trigering an eventlistener)
                this.postsUpdated.next([ ...this.posts ]);
                this.router.navigate([ "/" ]);
            });
    }

    updatePost(id: string, title: string, content: string) {
        const post: Post = { id: id, title: title, content: content, imagePath: null };
        this.http.put("http://localhost:3000/api/posts/" + id, post).subscribe((response) => {
            const updatedPosts = [ ...this.posts ];
            const oldPostIndex = updatedPosts.findIndex((p) => p.id === post.id);
            updatedPosts[oldPostIndex] = post;
            this.posts = updatedPosts;
            this.postsUpdated.next([ ...this.posts ]);
            this.router.navigate([ "/" ]);
        });
    }

    deletePost(postId: string) {
        this.http.delete("http://localhost:3000/api/posts/" + postId).subscribe(() => {
            const updatedPosts = this.posts.filter((post) => post.id !== postId);
            this.posts = updatedPosts;
            this.postsUpdated.next([ ...this.posts ]);
        });
    }
}
