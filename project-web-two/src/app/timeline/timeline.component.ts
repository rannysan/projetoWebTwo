import { Component, OnInit } from '@angular/core';
import { TimelineService } from '../timeline.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  posts = [];

  constructor(private timelineService: TimelineService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.posts = [];
    this.timelineService.getPosts()
      .subscribe(data => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        currentUser.user.seguidores.forEach((seg) => {
          data.posts.forEach((p) => {
            if (p.user._id === seg || p.user._id === currentUser.user._id) {
              this.posts.push(p);
            }
          });
        });
      }, (err) => {
        console.log(err.error);
      });
  }

  newPost(text: string) {
    this.timelineService.insertPost(text)
      .subscribe((data) => {
        if (data !== null) {
          this.refresh();
          this.snackBar.open('Post criado com sucesso!', null, { duration: 2000 });
        }
      });
  }

}
