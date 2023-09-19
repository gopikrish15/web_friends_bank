import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MembersComponent } from './members.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';


const routes: Routes = [
	{
		path: '',
		component: MembersComponent,
	}
];


@NgModule({
	declarations: [
		MembersComponent,
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		ReactiveFormsModule,
        PaginationModule,
		FormsModule
	],
	schemas: [
		CUSTOM_ELEMENTS_SCHEMA
	]
})

export class MemberModule { }
