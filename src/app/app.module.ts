import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms"; // this is needed for using ngModul
import { MatInputModule } from "@angular/material/input"; // path has to be specified
import { MatCardModule } from "@angular/material/card"; // path has to be specified
import { MatButtonModule } from "@angular/material/button"; // path has to be specified
import { MatToolbarModule } from "@angular/material/toolbar"; // path has to be specified
import { MatExpansionModule } from "@angular/material/expansion"; // path has to be specified
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"; // path has to be specified
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PostCreateComponent } from "./posts/post-create/post-create.component";
import { HeaderComponent } from "./header/header.component";
import { PostListComponent } from "./posts/post-list/post-list.component";

@NgModule({
    declarations: [ AppComponent, PostCreateComponent, HeaderComponent, PostListComponent ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatToolbarModule,
        MatExpansionModule,
        HttpClientModule,
        MatProgressSpinnerModule
    ],
    providers: [],
    //this array tells angular to search for Appcomponent's selector (app-route) in index.html
    bootstrap: [ AppComponent ]
})
export class AppModule {}
