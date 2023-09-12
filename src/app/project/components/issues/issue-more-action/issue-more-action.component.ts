import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AddIssueModalComponent } from '../../add-issue-modal/add-issue-modal.component';
@Component({
  selector: 'issue-more-action',
  templateUrl: './issue-more-action.component.html',
  styleUrls: ['./issue-more-action.component.scss']
})
export class IssueMoreActionComponent {
  constructor(private _modalService: NzModalService) {}

  openCreateSubtask() {
    this._modalService.create({
      nzContent: AddIssueModalComponent,
      nzClosable: false,
      nzFooter: null
    });
  }
}
