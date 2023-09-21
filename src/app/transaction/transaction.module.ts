import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TransactionComponent } from './transaction.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';


const routes: Routes = [
	{
		path: '',
		component: TransactionComponent,
	}
];


@NgModule({
	declarations: [
		TransactionComponent,
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

export class TransactionModule { }
