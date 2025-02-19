import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import { JIssue } from '@trungk18/interface/issue';
import { JUser } from '@trungk18/interface/user';
import { ProjectService } from '@trungk18/project/state/project/project.service';
import { IssueUtil } from '@trungk18/project/utils/issue';

@Component({
  selector: 'issue-assignees',
  templateUrl: './issue-assignees.component.html',
  styleUrls: ['./issue-assignees.component.scss']
})
@UntilDestroy()
export class IssueAssigneesComponent implements OnInit, OnChanges {
  @Input() issue: JIssue;
  @Input() users: JUser[];
  assignees: JUser[];
  searchControl: FormControl = new FormControl('');

  constructor(private _projectService: ProjectService) {}

  get searchAssignee() {
    return this.searchControl.value;
  }

  ngOnInit(): void {
    this.assignees = this.issue.userIds.map((userId) =>
      this.users.find((x) => x.id === userId)
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    const issueChange = changes.issue;
    if (this.users && issueChange.currentValue !== issueChange.previousValue) {
      this.assignees = this.issue.userIds.map((userId) =>
        this.users.find((x) => x.id === userId)
      );
    }
  }

  removeUser(userId: string) {
    const newUserIds = this.issue.userIds.filter((x) => x !== userId);
    this._projectService.updateIssue({
      ...this.issue,
      userIds: newUserIds
    });
  }

  addUserToIssue(user: JUser) {
    this._projectService.updateIssue({
      ...this.issue,
      userIds: [...this.issue.userIds, user.id]
    });
  }

  isUserSelected(user: JUser): boolean {
    return this.issue.userIds.includes(user.id);
  }

  ranDomUserChanged(users: JUser[]) {
    const lngUser = users.length;
    const rdUser = users[Math.floor(Math.random() * lngUser)];
    return rdUser;
  }

  unassignedUser() {
    this._projectService.updateIssue({
      ...this.issue,
      userIds: []
    });
  }

  getAvailableUsers() {
    const userIds = this.assignees.map(({ id }) => id);
    const availableUsers = this.users.filter(({ id }) => !userIds.includes(id));
    return availableUsers;
  }

  autoSelectUser() {
    const users = this.getAvailableUsers();
    const user = this.ranDomUserChanged(users);
    if (user) {
      this.addUserToIssue(user);
    }
  }

  checkFilterAssignees(userName: string) {
    return IssueUtil.searchString(userName, this.searchAssignee);
  }

  resetForm() {
    this.searchControl.patchValue('');
  }
}
