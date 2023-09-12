import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IssueDateReminderType, JIssue } from '@trungk18/interface/issue';
import { IssueTypeReminder } from '@trungk18/interface/issue-type-reminder';
import { ProjectService } from '@trungk18/project/state/project/project.service';
import { endOfMonth, format } from 'date-fns';
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
  date: Date;
  ranges: any;

  optionReminders: IssueTypeReminder[] = [];

  constructor(
    private _fb: FormBuilder,
    private _modalRef: NzModalRef,
    private _projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.initForm();
    const now = new Date();
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
    this.ranges = {
      'To day': [now, now],
      'This month': [now, endOfMonth(now)]
    };
  }

  initForm() {
    this.datePickerForm = this._fb.group({
      startDate: [''],
      endDate: [''],
      endDateTime: [''],
      dateReminder: [[IssueDateReminderType.AT_TIME_OF_DUE_DATE]]
    });
  }

  onChange(event: any) {
    this.datePickerForm.patchValue({
      startDate: format(event[0], 'yyyy-MM-dd'),
      endDate: format(event[1], 'yyyy-MM-dd')
    });
  }

  closeModal() {
    this._modalRef.close();
  }

  onSave() {
    console.log('Data Save', this.datePickerForm.value);
  }
}
