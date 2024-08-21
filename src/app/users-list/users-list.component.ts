import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements AfterViewInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'telephone','email', 'actions'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userapi: UserService, private router: Router) {
    this.dataSource = new MatTableDataSource<User>();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() { 
    this.fetchUsers();
  }

  fetchUsers() {
    this.userapi.getUsers().subscribe((data: User[]) => {
      console.log(data);
      this.dataSource.data = data;
    });
  }
  
  editUser(id: number) {
    this.router.navigate([`/create/${id}`])
  }

  
  supprimerUser(id: number) {
    console.log("id:",  id)

    this.userapi.DeleteUser(id).subscribe({
      next: (response) => {
        console.log('User deleted successfully:', response);
        this.dataSource.data = this.dataSource.data.filter(user => user.id !== id);
      
      },
      error: (error) => {
        console.error('Error creating user:', error);
        
      }
    });
  } 
}
