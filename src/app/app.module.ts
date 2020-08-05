import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms"; // this is needed for using ngModul
import { MatInputModule } from "@angular/material/input"; // path has to be specified
import { MatCardModule } from "@angular/material/card"; // path has to be specified
import { MatButtonModule } from "@angular/material/button"; // path has to be specified
import { MatToolbarModule } from "@angular/material/toolbar"; // path has to be specified
import { MatExpansionModule } from "@angular/material/expansion"; // path has to be specified

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PostCreateComponent } from "./posts/post-create/post-create.component";
import { HeaderComponent } from "./header/header.component";
import { PostListComponent } from "./posts/post-list/post-list.component";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
    declarations: [ AppComponent, PostCreateComponent, HeaderComponent, PostListComponent ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatToolbarModule,
        MatExpansionModule,
        HttpClientModule
    ],
    providers: [],
    //this array tells angular to search for Appcomponent's selector (app-route) in index.html
    bootstrap: [ AppComponent ]
})
export class AppModule {}
