import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  @Input() sideNavStatus: boolean = false;

  list = [

    {
      number : '1',
      name: 'Dashboard',
      icon: 'fa-solid fa-house',
      path: 'dashboard'
    },
    {
      number : '2',
      name: 'Members',
      icon: 'fa-solid fa-user',
      path: 'members'
    },
    {
      number : '3',
      name: 'Transactions',
      icon: 'fa-solid fa-bank',
      path: 'transactions'
    },
    {
      number : '4',
      name: 'Notifications',
      icon: 'fa-solid fa-cart-shopping'
    },
    {
      number : '5',
      name: 'Settings',
      icon: 'fa-solid fa-gear'
    }
  ]

}
