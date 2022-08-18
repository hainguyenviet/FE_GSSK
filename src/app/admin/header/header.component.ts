import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/server_service/AuthService/auth.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
  }
  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  logout() {
    this.authService.clearLocalStorage();
    this.router.navigateByUrl('/home');
  }
}
