import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  navItems = ['home', 'about us', 'solutions', 'clients & testimonials', 'our team', 'blog', 'ع'];

  constructor() { }

  ngOnInit() {
  }

}
