import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../service/';
import { MenuItem } from 'primeng/components/common/menuitem';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  users: User[];
  selectedUser: User;
  items: MenuItem[];
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.get('api/user/').subscribe(res => {
      this.users = res;
    });
    this.items = [
      { label: 'View', icon: 'fa-search', command: (event) => this.viewUser(this.selectedUser) },
      { label: 'Delete', icon: 'fa-close', command: (event) => this.deleteUser(this.selectedUser) }
    ];
  }
  viewUser(select: User) {
    console.log(JSON.stringify(select));

  }
  deleteUser(select: User) {
    this.apiService.delete('api/user/' + select.id).subscribe(res => {
      console.log(res);
    });

  }
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}
