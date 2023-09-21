import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';



const routes: Routes = [{
	path: '',
	component: LayoutComponent,
	children: [{
		path: '',
		redirectTo: '/dashboard',
		pathMatch: 'full'
	}, {
		path: 'dashboard',
		loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
	},
  {
    path: 'members',
    loadChildren: () => import('./members/member.module').then(m => m.MemberModule)
  },
  {
    path: 'transactions',
    loadChildren: () => import('./transaction/transaction.module').then(m => m.TransactionModule)
  }]
},{
	path: '**',
	redirectTo: '/dashboard',
	pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
