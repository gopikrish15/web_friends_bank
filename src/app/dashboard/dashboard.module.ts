import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';


const routes: Routes = [
	{
		path: '',
		component: DashboardComponent,
	}
];


@NgModule({
	declarations: [
		DashboardComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		ReactiveFormsModule,
		FormsModule,
	],
	schemas: [
		CUSTOM_ELEMENTS_SCHEMA
	]
})

export class DashboardModule { }
