import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { User } from '@app/models/user';
import { CategoriesModel } from '@app/models/categories.model';
import { DialogModals } from '@app/utils/dialog-modals';
import { ApiService } from '@app/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public pageWidth: number;
  public isLogged: boolean = false;
  public showHeader: boolean = false;
  public user: User;
  private isSidebarOpen: boolean = false;
  public categories: Array<Object> = CategoriesModel.categories;

  public isCollapsedCategories: boolean = true;
  public isCollapsedUser: boolean = true;

  @ViewChild('SidenavButton') sidenavButton: ElementRef;
  @ViewChild('Sidenav') sidenav: ElementRef;


  constructor(private router: Router, public dialog: DialogModals, private service: ApiService) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/login' || event['url'] == '/registrar') {
          this.showHeader = false;
        } else {
          this.showHeader = true;
        }
      }
      this.isLogged = false;
      if (sessionStorage.getItem('user')) {
        this.user = <User>JSON.parse(sessionStorage.getItem('user'));
        this.isLogged = true;
      }
    });
  }


  ngOnInit(): void {
    this.pageWidth = window.innerWidth;
  }

  public logout(): void {
    sessionStorage.removeItem('user');
    location.reload();
    this.router.navigateByUrl('/')
  }

  public onResize(e): void {
    this.pageWidth = e.target.innerWidth;
    if (this.pageWidth > 1000) {
      document.getElementById("sideNav").style.width = "0";
    }
  }

  public confirmUser(): void {
    let user = JSON.parse(sessionStorage.getItem('user'))
    if (!user.isConfirmed) {
      console.log(user.email);
      
      if(!user.email){
        return;
      }
      this.service.SendConfirmationEmail(user.email).subscribe(response => {
        this.dialog.authenticateUser(user, () => this.router.navigate(["conta"])
        );
      });
      return;
    }
    this.router.navigate(["conta"]);
  }

  public toggleNav(): void {
    if (this.isSidebarOpen) {
      this.closeNav();
    } else {
      this.openNav();
    }
  }

  public openNav(): void {
    document.getElementById("sideNav").style.width = "300px";
    document.getElementById("sideNav").classList.add("border");
    this.isSidebarOpen = true;
  }

  public closeNav(): void {
    document.getElementById("sideNav").style.width = "0";
    document.body.style.backgroundColor = "white";
    document.getElementById("sideNav").classList.remove("border");
    this.isSidebarOpen = false;
  }

  public onAnnounce(): void {
    if (this.isLogged) {    
      let user = JSON.parse(sessionStorage.getItem('user'))
      if (!user.isConfirmed) {
        console.log(user.email);
        
        if(!user.email){
          return;
        }
        this.service.SendConfirmationEmail(user.email).subscribe(response => {
          this.dialog.authenticateUser(user, () => this.router.navigate(["registrar-produto"]));
        });
        return;
      }
      this.router.navigate(["registrar-produto"]);
    } else {
      this.dialog.loginError();
    }
  }

}
