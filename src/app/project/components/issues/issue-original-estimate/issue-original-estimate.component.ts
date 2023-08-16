import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { JIssue } from '@trungk18/interface/issue';
import { ProjectService } from '@trungk18/project/state/project/project.service';

@Component({
  selector: 'issue-original-estimate',
  templateUrl: './issue-original-estimate.component.html',
  styleUrls: ['./issue-original-estimate.component.scss']
})
export class IssueOriginalEstimateComponent implements OnChanges {
  @Input() issue: JIssue;
  timeControl: FormControl = new FormControl('');
  isEditing: boolean = false;

  constructor(private _projectService: ProjectService) {}

  ngOnChanges(changes: SimpleChanges): void {
    const issueChange = changes.issue;
    if (issueChange.currentValue !== issueChange.previousValue) {
      this.timeControl = new FormControl(this.issue.originalEstimate);
    }
  }

  setTimeEdit(mode: boolean) {
    this.isEditing = mode;
  }

  formatEstimateTime() {
    this.setTimeEdit(false);
    const value = this.timeControl.value;
    this._projectService.updateIssue({
      ...this.issue,
      originalEstimate: value
    });
  }

  cancelEditTime() {
    this.timeControl.patchValue('');
    this.setTimeEdit(false);
  }
}
