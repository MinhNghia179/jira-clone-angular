import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IssueDateReminderType, JIssue } from '@trungk18/interface/issue';
import { IssueTypeReminder } from '@trungk18/interface/issue-type-reminder';
import { ProjectService } from '@trungk18/project/state/project/project.service';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';

@Component({
  selector: 'issue-date-picker',
  templateUrl: './issue-date-picker.component.html',
  styleUrls: ['./issue-date-picker.component.scss']
})
export class IssueDatePickerComponent implements OnInit {
  @Input() issue$: Observable<JIssue>;

  datePickerForm: FormGroup;
  date: null;

  optionReminders: IssueTypeReminder[] = [];

  constructor(
    private _fb: FormBuilder,
    private _modalRef: NzModalRef,
    private _projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.optionReminders = [
      new IssueTypeReminder(IssueDateReminderType.AT_TIME_OF_DUE_DATE),
      new IssueTypeReminder(IssueDateReminderType.FIVE_MINUTES),
      new IssueTypeReminder(IssueDateReminderType.TEN_MINUTES),
      new IssueTypeReminder(IssueDateReminderType.FIFTEEN_MINUTES),
      new IssueTypeReminder(IssueDateReminderType.ONE_HOUR),
      new IssueTypeReminder(IssueDateReminderType.TWO_HOURS),
      new IssueTypeReminder(IssueDateReminderType.ONE_DAY),
      new IssueTypeReminder(IssueDateReminderType.TWO_DAYS)
    ];
  }

  initForm() {
    this.datePickerForm = this._fb.group({
      checkedStartDate: [false],
      checkedEndDate: [true],
      startDate: [''],
      endDate: [''],
      endDateTime: [''],
      dateReminder: [[IssueDateReminderType.AT_TIME_OF_DUE_DATE]]
    });
  }

  onChange(event: any) {}

  closeModal() {
    this._modalRef.close();
  }

  onSave() {
    console.log('Data Save', this.datePickerForm.value);
  }
}
