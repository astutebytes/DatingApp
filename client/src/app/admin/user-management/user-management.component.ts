import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RoleModalComponent } from 'src/app/modal/role-modal/role-modal.component';
import { User } from 'src/app/_models/user';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  bsModalRef: BsModalRef<RoleModalComponent> =
    new BsModalRef<RoleModalComponent>();
  availableRoles = ['Admin', 'Moderator', 'Member'];

  constructor(
    private adminService: AdminService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.getUsersWithRoles();
  }

  getUsersWithRoles() {
    this.adminService.getUsersWithRoles().subscribe({
      next: (users) => (this.users = users),
    });
  }

  openRolesModal(model: User) {
    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        username: model.username,
        availableRoles: this.availableRoles,
        selectedRoles: [...model.roles],
      },
    };
    this.bsModalRef = this.modalService.show(RoleModalComponent, config);
    this.bsModalRef.onHide?.subscribe({
      next: () => {
        const selectedRoles = this.bsModalRef.content?.selectedRoles;
        if (!this.arrayEqual(selectedRoles!, model.roles)) {
          this.adminService
            .updateUserRoles(model.username, selectedRoles!)
            .subscribe({
              next: (roles) => (model.roles = roles),
            });
        }
      },
    });
  }

  private arrayEqual(arr1: any[], arr2: any[]) {
    return JSON.stringify(arr1.sort()) === JSON.stringify(arr2.sort());
  }
}
