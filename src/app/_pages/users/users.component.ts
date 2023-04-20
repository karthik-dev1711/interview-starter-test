import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { selectAllUsers, User, UsersActions } from '@app/_state/users/users-store';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UsersComponent implements OnInit{

  columnsToDisplay = ['action', 'firstName', 'lastName', 'maidenName', 'age',"gender","email","phone","birthDate"];
  expandedElement: User | null = null;
  userForm!:FormGroup;
  saveProcess=false; //for spinner
  userList$: Observable<User[]> = this.store.pipe(select(selectAllUsers));

  constructor(private fb:FormBuilder, private store: Store){}

  ngOnInit(): void {
    this.store.dispatch(UsersActions.getUsersList());
    this.initalFormLoad();
  }

  initalFormLoad(): void {
    this.userForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      maidenName: [''],
      age: [''],
      gender: [''],
      email: [''],
      phone: [''],
      birthDate: [''],
    })
  }

  saveChange(id:string): void{
    // this.saveProcess = true;
    // setTimeout(() => {
    //   this.saveProcess = false;
    // }, 1500); 
    this.store.dispatch(UsersActions.updateUser({ userInfo: this.userForm.value, selectedUserId: id })) 
}

cancleChange(): void {
  this.expandedElement = null
}

onExpande(userData:User): void{
  this.userForm.patchValue(userData)
}

}
