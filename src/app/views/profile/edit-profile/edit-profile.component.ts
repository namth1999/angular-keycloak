import {Component, OnDestroy, OnInit} from '@angular/core';
import {KeycloakService} from 'keycloak-angular';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {SrpingbootBeService} from '../../srpingboot-be.service';
import {AdminService} from '../../admin.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit, OnDestroy {

  result: any;

  userName = '';

  user: any;

  unsub$ = new Subject<void>();

  constructor(private keycloakService: KeycloakService, private springbootBeService: SrpingbootBeService,
              private adminService: AdminService) {
  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }

  ngOnInit(): void {
    this.initializeUserOptions();
    this.springbootBeService.getProducts().pipe(takeUntil(this.unsub$)).subscribe(res => {
      console.log(res);
      this.result = res;
    });
    this.adminService.getUserInfo().pipe(takeUntil(this.unsub$)).subscribe(res => {
      console.log(res);
      this.user = res;
    });
  }


  private initializeUserOptions(): void {
    this.userName = this.keycloakService.getUsername();
  }

  logout(): void {
    this.keycloakService.logout('http://localhost:4200');
  }

}
