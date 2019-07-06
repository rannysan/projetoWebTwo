import { Injectable } from '@angular/core';
import { Posts } from './shared/IPosts';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map, tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  public token: string;
  private url = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) {
    this.token = JSON.parse(localStorage.getItem('authorization'));
  }


  getPosts(): Observable<any> {
    const header = {
      headers: new HttpHeaders()
        .set('authorization', this.token)
    };
    return this.http.get<any>(this.url + '/timeline', header);
  }

  login(username: string, pass: string): Observable<any> {
    return this.http.post<any>(this.url + '/auth/login', { name: username, password: pass })
      .pipe(
        map(user => {
          // login bem-sucedido se houver um token jwt na resposta
          if (user && user.token) {
            // armazenar detalhes do usuário e token jwt no localStorage para manter o usuário logado entre as atualizações da página
            this.token = 'Bearer ' + user.token;
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('authorization', JSON.stringify(this.token));
          }
          return user;
        })
      );
  }

  logout(): void {
    // Limpa o token removendo o usuário do local store para efetuar o logout
    this.token = null;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authorization');
  }
}
