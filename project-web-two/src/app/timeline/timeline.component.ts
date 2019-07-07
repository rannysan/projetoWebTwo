import { Component, OnInit } from '@angular/core';
import { TimelineService } from '../timeline.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  posts = [];

  constructor(private timelineService: TimelineService) { }

  ngOnInit() {
    this.timelineService.getPosts()
      .subscribe(data => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        currentUser.user.seguidores.forEach((seg) => {
          data.posts.forEach((p) => {
            if (p.user._id === seg) {
              this.posts.push(p);
            }
          });
        });
      }, (err) => {
        console.log(err.error);
      });
  }



}
