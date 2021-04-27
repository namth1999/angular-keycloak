import {Component, OnDestroy, OnInit} from '@angular/core';
import {KeycloakService} from 'keycloak-angular';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {SrpingbootBeService} from '../../srpingboot-be.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit, OnDestroy {

  result: any;

  user = '';

  unsub$ = new Subject<void>();

  constructor(private keycloakService: KeycloakService, private springbootBeService: SrpingbootBeService) {
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
  }


  private initializeUserOptions(): void {
    this.user = this.keycloakService.getUsername();
  }

  logout(): void {
    this.keycloakService.logout('http://localhost:4200');
  }

}
