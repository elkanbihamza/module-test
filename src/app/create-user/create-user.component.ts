import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user.model';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent implements OnInit { 
  userData: User | null = null;
  userForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    address: new FormControl('') ,
    telephone: new FormControl('') ,
    email: new FormControl ('', [Validators.email]) ,
    ville: new FormControl('') 
  });

  villes = [
    { value: 'rabat', viewValue: 'Rabat' },
    { value: 'casablanca', viewValue: 'Casablanca' },
    { value: 'marrakech', viewValue: 'Marrakech' }
  ];
  
  constructor(
    private userService: UserService,
    private router: Router , 
    private route : ActivatedRoute ,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      
      firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        address: [''], 
        email: ['', [Validators.required, Validators.email]] ,
        telephone: [''] , 
        ville: ['']
    });

    const userId = this.route.snapshot.params['id'];
    if (userId) {
      this.loadUser(userId);
    }
  }

  submit() {
    const userId = this.route.snapshot.params['id'];

    if(userId){
      this.userService.updateUser(userId, this.userForm.value).subscribe({
        next: (response) => {
          console.log("User updated successfully", response)
          this.router.navigate(['/list'])
        },
        error: (error) => {
          console.log('error updating user', error)
        }
      })
    } else {
      this.userService.postUser(this.userForm.value).subscribe({
        next: (response) => {
          console.log('User created successfully:', response);
          this.router.navigate(['/list'])
        },
        error: (error) => {
          console.log('Error creating user:', error);
          
        }
      });
    }
  }

  cancel() {
    this.router.navigate(['/list'])
  }


  loadUser(id: number): void {
    this.userService.getUser(id).subscribe({
      next: (response) => {
        console.log("User fetched successfully", response)
        this.userData = response;
        this.populateFormFields();
      },
      error: (error) => {
        console.log("error fetchnig user", error)
      }
    })
  }

  populateFormFields(): void {
    if (this.userData) {
      this.userForm.patchValue({
        firstName: this.userData.firstName,
        lastName: this.userData.lastName,
        address: this.userData.address,
        email: this.userData.email,
        telephone: this.userData.telephone ,
        ville: this.userData.ville
      });
    }
  }



}
