import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map, tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  public token: string;
  private url = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.token = JSON.parse(localStorage.getItem('authorization'));
  }


  getPosts(): Observable<any> {
    if (this.token === null) {
      this.router.navigateByUrl('');
    }

    const header = {
      headers: new HttpHeaders()
        .set('authorization', this.token)
    };
    return this.http.get<any>(this.url + '/timeline', header);
  }

  getUsers(): Observable<any> {
    if (this.token === null) {
      this.router.navigateByUrl('');
    }

    const header = {
      headers: new HttpHeaders()
        .set('authorization', this.token)
    };
    return this.http.get<any>(this.url + '/auth/users', header);
  }

  putUsers(id: string, followId: string): Observable<any> {
    return this.http.put<any>(this.url + '/auth/' + id, { fId: followId })
      .pipe(
        map(user => {
          if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
          }
          return user;
        })
      );
  }

  insertPost(text: string): Observable<any> {
    const headers = {
      headers: new HttpHeaders()
        .set('authorization', this.token)
    };

    return this.http.post(this.url + '/timeline', { text }, headers);
  }

  deletePost(id: string) {
    const headers = {
      headers: new HttpHeaders()
        .set('authorization', this.token)
    };

    return this.http.delete(this.url + '/timeline/' + id, headers);
  }

  editPost(id: string, text: string) {
    const headers = {
      headers: new HttpHeaders()
        .set('authorization', this.token)
    };

    return this.http.put(this.url + '/timeline/' + id, { text }, headers);
  }

  register(name: string, password: string) {
    return this.http.post(this.url + '/auth/register', { name, password });
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
