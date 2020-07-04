import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public pageWidth: number;
  public isCollapsed: boolean = true;
  private isSidebarOpen: boolean = false;

  @ViewChild('SidenavButton') sidenavButton: ElementRef;
  @ViewChild('Sidenav') sidenav: ElementRef;


  constructor() {
  }

  ngOnInit(): void {
    this.pageWidth = window.innerWidth;
  }

  onResize(e) {
    this.pageWidth = e.target.innerWidth;
    if (this.pageWidth > 1000) {
      document.getElementById("sideNav").style.width = "0";
      document.body.style.backgroundColor = "white";
    }
  }

  toggleNav() {
    if (this.isSidebarOpen) {
      this.closeNav();
    } else {
      this.openNav();
    }
  }

  openNav() {
    document.getElementById("sideNav").style.width = "300px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.2)";  
    this.isSidebarOpen = true;
  }

  closeNav() {
    document.getElementById("sideNav").style.width = "0";
    document.body.style.backgroundColor = "white";
    this.isSidebarOpen = false;
  }


}
