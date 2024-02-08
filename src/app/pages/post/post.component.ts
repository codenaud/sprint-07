import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  http = inject(HttpClient);
  posts: any = [];

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts() {
    this.http
      .get('https://jsonplaceholder.typicode.com/posts?_limit=10')
      .subscribe((posts: any) => {
        console.log(posts); // se muestra en la 'consola'
        this.posts = posts; // se muestra en 'pantalla' => {{ post.name}} en HTML
      });
  }
}

/**
   *  ! Solución ERROR => NullInjectorError:
   *  * recuerda añadir  --> provideHttpClient() en app.config.ts
   *  export const appConfig: ApplicationConfig = {
      providers: [provideRouter(routes), provideHttpClient()],
      };
  */

/*
      Ejemplo de post
      -------------------
      {
      "userId": 1,
      "id": 1,
      "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "body": "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam       nostrum rerum est autem sunt rem eveniet architecto"
      },
      -------------------
 */
