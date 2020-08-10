import { PostsService } from "./../posts.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Post } from "./../post.model";
//rxjs helps us to pass data between components
import { Subscription } from "rxjs";

//decorator that is needed for every ts file, scince it marks it that way
//here templates have to be defined (html)
@Component({
    selector: "app-post-list;",
    templateUrl: "./post-list.component.html",
    styleUrls: [ "./post-list.component.scss" ]
})
export class PostListComponent implements OnInit, OnDestroy {
    /*
    this method would also work since typescript makes it possible with the public keyword
    but it is not aware of module, since it is not scanning files. There are 2 options:
    1. In the app.module it has to be present as a provider.
    2. In the posts.service.ts file before the classname a decorator has to be added:
      -@Injectable({ provideIn: 'root'})
      this also makes only ONE instance!!!!
      */
    posts: Post[] = [];
    isLoading = false;
    private postsSub: Subscription;

    constructor(public postsService: PostsService) {}

    ngOnInit() {
        this.isLoading = true;
        this.postsService.getPosts();
        //so getPostUpdateListener was created in postservice file as an eventlistener,
        //that way we know that is has to be updated, therefor subscribe method can be called on that
        //which has 3 arguments, the first one is a method that gets our posts back,
        this.postsSub = this.postsService.getPostUpdateListener().subscribe((posts: Post[]) => {
            this.isLoading = false;
            this.posts = posts;
        });
    }
    //the subscription gets destroyed whenever it is removed from the DOM (unsubcription)
    ngOnDestroy() {
        this.postsSub.unsubscribe();
    }

    onDelete(postId: string) {
        this.postsService.deletePost(postId);
    }

    /*
  classic approach
  postsService: PostsService;
    constructor(postsService: PostsService) {
        this.postsService = postsService;
    }
    */
}

/*
property Binding,
event binding
2-way binding -->
*/

/**
 *   // posts = [
    //     { title: "First Post", content: "This is the first post's content" },
    //     { title: "Second Post", content: "This is the second post's content" },
    //     { title: "Third Post", content: "This is the third post's content" },
    //     { title: "Fourth Post", content: "This is the fourth post's content" }
    // ];
 *
 */
