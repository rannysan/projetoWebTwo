import { Component, OnInit } from '@angular/core';
import { TimelineService } from './../timeline.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  users = [];

  constructor(private timelineService: TimelineService) { }

  ngOnInit() {
    this.timelineService.getUsers()
      .subscribe((data) => {
        this.users = data.users;
      });
  }

}
