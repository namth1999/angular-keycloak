import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProfileService} from '../service/profile.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  result: any;

  constructor(private router: Router, private profileService: ProfileService) {
  }

  ngOnInit(): void {
    this.result = this.profileService.getProducts().subscribe(res => this.result = res);
  }

  showProfile(): void {
    this.router.navigateByUrl('/profile');
  }

}
