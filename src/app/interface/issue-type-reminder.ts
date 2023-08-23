import { IssueUtil } from '@trungk18/project/utils/issue';
import { IssueDateReminderType } from './issue';

export class IssueTypeReminder {
  key: IssueDateReminderType;
  label: string;
  value: number;

  constructor(issueReminderType: IssueDateReminderType) {
    this.key = issueReminderType;
    this.label = IssueUtil.getIssueReminderLabel(issueReminderType);
    this.value = IssueUtil.getIssueReminderValue(issueReminderType);
  }
}
