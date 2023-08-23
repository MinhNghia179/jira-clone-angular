import { JComment } from './comment';

/* eslint-disable no-shadow */
export enum IssueType {
  STORY = 'Story',
  TASK = 'Task',
  BUG = 'Bug'
}
export enum IssueStatus {
  BACKLOG = 'Backlog',

  SELECTED = 'Selected',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  IN_PROGRESS = 'InProgress',
  DONE = 'Done',
  CLOSE = 'Close'
}

export enum IssueDateReminderType {
  AT_TIME_OF_DUE_DATE = 'AtTimeOfDueDate',
  FIVE_MINUTES = 'FiveMinutes',
  TEN_MINUTES = 'TenMinutes',
  FIFTEEN_MINUTES = 'FifteenMinutes',
  ONE_HOUR = 'OneHour',
  TWO_HOURS = 'TwoHours',
  ONE_DAY = 'OneDay',
  TWO_DAYS = 'TwoDays'
}

export const IssueStatusDisplay = {
  [IssueStatus.BACKLOG]: 'Backlog',
  [IssueStatus.SELECTED]: 'Selected for Development',
  [IssueStatus.IN_PROGRESS]: 'In progress',
  [IssueStatus.DONE]: 'Done',
  [IssueStatus.CLOSE]: 'Close'
};

export const IssueDateReminderTypeDisplay = {
  [IssueDateReminderType.AT_TIME_OF_DUE_DATE]: 'At time of due date',
  [IssueDateReminderType.FIVE_MINUTES]: '5 minutes before',
  [IssueDateReminderType.TEN_MINUTES]: '10 minutes before',
  [IssueDateReminderType.FIFTEEN_MINUTES]: '15 minutes before',
  [IssueDateReminderType.ONE_HOUR]: '1 hour before',
  [IssueDateReminderType.TWO_HOURS]: '2 hour before',
  [IssueDateReminderType.ONE_DAY]: '1 day before',
  [IssueDateReminderType.TWO_DAYS]: '2 day before'
};

export const IssueDateReminderTypeValues = {
  [IssueDateReminderType.AT_TIME_OF_DUE_DATE]: 0,
  [IssueDateReminderType.FIVE_MINUTES]: 5,
  [IssueDateReminderType.TEN_MINUTES]: 10,
  [IssueDateReminderType.FIFTEEN_MINUTES]: 15,
  [IssueDateReminderType.ONE_HOUR]: 60,
  [IssueDateReminderType.TWO_HOURS]: 60 * 2,
  [IssueDateReminderType.ONE_DAY]: 24 * 60,
  [IssueDateReminderType.TWO_DAYS]: 24 * 2 * 60
};
export enum IssuePriority {
  LOWEST = 'Lowest',
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  HIGHEST = 'Highest'
}

export const IssuePriorityColors = {
  [IssuePriority.HIGHEST]: '#CD1317',
  [IssuePriority.HIGH]: '#E9494A',
  [IssuePriority.MEDIUM]: '#E97F33',
  [IssuePriority.LOW]: '#2D8738',
  [IssuePriority.LOWEST]: '#57A55A'
};

export interface JIssue {
  id: string;
  title: string;
  type: IssueType;
  status: IssueStatus;
  priority: IssuePriority;
  listPosition: number;
  description: string;
  estimate: number;
  timeSpent: number;
  timeRemaining: number;
  createdAt: string;
  updatedAt: string;
  reporterId: string;
  userIds: string[];
  comments: JComment[];
  projectId: string;
  originalEstimate: number;
  label: string;
  startTime: string;
  endTime: string;
}
/* eslint-enable no-shadow */
