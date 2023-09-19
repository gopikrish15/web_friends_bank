import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ErrorComponent } from './shared/error/error.component';

@NgModule({
	imports: [
	],
	exports: [
		FormsModule,
		ReactiveFormsModule,
		NgSelectModule
	],
	declarations: [
		ErrorComponent
	],
	schemas:[
		CUSTOM_ELEMENTS_SCHEMA
	]
})

export class AppCommonModule {}