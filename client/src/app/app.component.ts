import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  baseUrl = environment.apiUrl;
  users: any;
  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {}
  ngOnInit(): void {
    // this.getUsers();
    this.setCurrentUser();
  }

  getUsers() {
    this.http.get(this.baseUrl + 'users').subscribe({
      next: (response) => (this.users = response),
      error: (err) => console.log(err),
      complete: () => console.log('Request completed successfully'),
    });
  }

  setCurrentUser() {
    const currentUserString = localStorage.getItem('user');
    if (!currentUserString) return;
    const user: User = JSON.parse(currentUserString);
    this.accountService.setCurrentUser(user);
  }
}
