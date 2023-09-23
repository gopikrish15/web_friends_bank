import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { DebitTransactionComponent } from '../debit-transaction/debit-transaction.component';


const routes: Routes = [
	{
		path: '',
		component: DebitTransactionComponent,
	}
];


@NgModule({
	declarations: [
     DebitTransactionComponent,
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

export class DebitModule { }
