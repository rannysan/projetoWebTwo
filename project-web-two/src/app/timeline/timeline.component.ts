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
        this.posts = data.posts;
      }, (err) => {
        console.log(err.error);
      });
  }



}
