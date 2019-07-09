import { Component, OnInit } from '@angular/core';
import { TimelineService } from '../timeline.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  posts = [];
  currentUser = JSON.parse(localStorage.getItem('currentUser'));

  constructor(private timelineService: TimelineService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.posts = [];
    this.timelineService.getPosts()
      .subscribe(data => {
          data.posts.forEach((p) => {
            if (p.user._id === this.currentUser.user._id) {
              this.posts.push(p);
            }
          });
      }, (err) => {
        console.log(err.error);
      });
  }

  delete(id: string) {
    this.timelineService.deletePost(id)
    .subscribe(() => {
      this.refresh();
      this.snackBar.open('Postagem deletada com sucesso!', null, { duration: 2000 });
    }, (err) => {
      this.snackBar.open('Erro ao tentar deletar postagem!', null, { duration: 2000 });
    });
  }

  edit(id: string, text: string) {
    this.timelineService.editPost(id, text)
    .subscribe(() => {
      this.refresh();
      this.snackBar.open('Postagem editada com sucesso!', null, { duration: 2000 });
    }, (err) => {
      this.snackBar.open('Erro ao tentar editar postagem!', null, { duration: 2000 });
    });
  }

}
