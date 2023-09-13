import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { IssueDateReminderType, JIssue } from '@trungk18/interface/issue';
import { IssueTypeReminder } from '@trungk18/interface/issue-type-reminder';
import { ProjectService } from '@trungk18/project/state/project/project.service';
import { endOfDay, endOfMonth, isAfter, isEqual } from 'date-fns';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'issue-date-picker',
  templateUrl: './issue-date-picker.component.html',
  styleUrls: ['./issue-date-picker.component.scss']
})
export class IssueDatePickerComponent implements OnInit {
  @Input() issue: JIssue;

  form: FormGroup;
  ranges: any;

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
    const { startDate, endDate } = this.issue;
    const now = new Date();
    this.ranges = {
      'To day': [now, endOfDay(now)],
      'This month': [now, endOfMonth(now)]
    };
    this.form = this._fb.group({
      datePicker: [
        startDate && endDate && [new Date(startDate), new Date(endDate)],
        [Validators.required, this.datePickerValidator]
      ],
      dateReminder: [
        this.issue.dateReminder ?? IssueDateReminderType.AT_TIME_OF_DUE_DATE
      ]
    });
  }

  datePickerValidator() {
    return (control: AbstractControl): { [key: string]: any } => {
      const { startDate, endDate } = control.value;
      const start = new Date(startDate);
      const end = new Date(endDate);
      const isValid = isAfter(end, start) && !isEqual(start, end);
      return isValid
        ? null
        : { dateTime: 'Your end date is less than start date' };
    };
  }

  closeModal() {
    this._modalRef.close();
  }

  onSave() {
    const { dateReminder, datePicker } = this.form.value;
    this._projectService.updateIssue({
      ...this.issue,
      startDate: datePicker[0].toISOString(),
      endDate: datePicker[1].toISOString(),
      dateReminder
    });
    this.closeModal();
  }
}
