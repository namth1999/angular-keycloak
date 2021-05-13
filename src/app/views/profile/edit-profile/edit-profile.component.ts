import {Component, OnDestroy, OnInit} from '@angular/core';
import {KeycloakService} from 'keycloak-angular';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {SrpingbootBeService} from '../../srpingboot-be.service';
import {AdminService} from '../../admin.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit, OnDestroy {

  files: File[];
  notImageFile: File[];
  imagesUrl: any[];

  result: any;

  userName = '';

  user: any;

  unsub$ = new Subject<void>();

  constructor(private keycloakService: KeycloakService, private springbootBeService: SrpingbootBeService,
              private adminService: AdminService, private toastService: ToastrService) {
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

  fileChange($event): void {
    this.imagesUrl = [];
    this.notImageFile = [];

    const files: FileList = $event.target.files;
    if (this.files) {
      this.files.push(...Array.from(files));
    } else {
      this.files = Array.from(files);
    }

    if (this.files.length > 0) {
      this.files.forEach(file => {
        if (file.size > 10485760) {
          this.toastService.error('Large file (>10MB)');
          return;
        }

        if (this.isFileImage(file)) {
          const reader = new FileReader();
          reader.readAsDataURL(file); // read file as data url
          reader.onload = (event: any) => { // called once readAsDataURL is completed
            this.imagesUrl.push(event.target.result);
          };
        } else {
          this.notImageFile.push(file);
        }
      });

    }
  }

  isFileImage(file): boolean {
    return file && file.type.split('/')[0] === 'image';
  }

  upload(): void {
    const formData = new FormData();
    if (this.files) {
      this.files.forEach(file => {
        formData.append('files', file);
      });
    }
    this.springbootBeService.uploadFile(formData).subscribe(res => {
      console.log(res);
    });
  }
}
