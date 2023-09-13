import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { JIssue } from '@trungk18/interface/issue';
import { NzModalService } from 'ng-zorro-antd/modal';
import { IssueDatePickerComponent } from '../../issue-date-picker/issue-date-picker.component';

@Component({
  selector: 'issue-dates',
  templateUrl: './issue-dates.component.html',
  styleUrls: ['./issue-dates.component.scss']
})
export class IssueDatesComponent implements OnInit {
  @Input() issue: JIssue;
  @Output() onClosed = new EventEmitter();

  constructor(private _modalService: NzModalService) {}

  ngOnInit(): void {}

  openDatesModal(issueId: string) {
    this._modalService.create({
      nzContent: IssueDatePickerComponent,
      nzWidth: 500,
      nzClosable: true,
      nzFooter: null,
      nzComponentParams: {
        issue: this.issue
      }
    });
  }
}
