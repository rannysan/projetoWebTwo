import { Injectable } from '@angular/core';
import { Posts } from './IPosts';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {
  constructor() { }

  posts: Posts[] = [
    {
      name: 'Testando 1',
      text: 'Testando um texto para a linha de textos!!',
    },
    {
      name: 'Testando 1',
      text: 'Testando um texto para a linha de textos!! Com mais texto ainda!!',
    },
    {
      name: 'Testando 3',
      text: 'Testando um texto para a linha de textos!! Com mais texto!!',
    },
    {
      name: 'Testando 4',
      text: 'Testando um texto para a linha de textos!! Com mais texto!!',
    },
  ];


  getPosts() {
    return this.posts;
  }
}