import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;

  constructor(private router: Router) { }

  username: string;
  password: string;

  ngOnInit() { }

  login(): void {
    if (this.username === 'admin' && this.password === 'admin') {
      this.router.navigate(['timeline']);
    } else {
      alert('Invalid credentials');
    }
  }

}
