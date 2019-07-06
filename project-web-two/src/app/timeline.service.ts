import { Injectable } from '@angular/core';
import { Posts } from './shared/IPosts';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {
  constructor(
    private http: HttpClient
  ) { }

  posts: Posts[] = [
    {
      name: 'Testando 1',
      text: 'Testando um texto para a linha de textos!!',
      user: [],
    },
    {
      name: 'Testando 1',
      text: 'Testando um texto para a linha de textos!! Com mais texto ainda!!',
      user: [],
    },
    {
      name: 'Testando 3',
      text: 'Testando um texto para a linha de textos!! Com mais texto!!',
      user: [],
    },
    {
      name: 'Testando 4',
      text: 'Testando um texto para a linha de textos!! Com mais texto!!',
      user: [],
    },
  ];


  getPosts() {
    return this.posts;
  }

  login(username: string, pass: string): Observable<any> {
    return this.http.post<any>('http://localhost:3000/auth/login', { name: username, password: pass })
      .pipe(
        map(user => {
          // login bem-sucedido se houver um token jwt na resposta
          if (user && user.token) {
            // armazenar detalhes do usuário e token jwt no localStorage para manter o usuário logado entre as atualizações da página
            console.log('teste');
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('authorization', JSON.stringify('Bearer ' + user.token));
          }
          return user;
        })
      );
  }
}
