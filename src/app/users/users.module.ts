import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ChipsModule } from 'primeng/chips';

import { UsersComponent } from './users.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user/user.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ModalComponent } from './shared/modal/modal.component';

import { UserService } from './shared/user.service';

import { UsersRoutingModule } from './users-routing.module';

export const MATERIAL_MODULES = [
  ButtonsModule,
  ModalModule.forRoot()
];

@NgModule({
  declarations: [
    UsersComponent,
    UserListComponent,
    UserComponent,
    UserDetailsComponent,
    ModalComponent
  ],
  imports: [
    ...MATERIAL_MODULES,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    CommonModule,
    ChipsModule
  ],
  providers: [ UserService ],
  exports: [ UsersComponent ]
})
export class UsersModule {}
