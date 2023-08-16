import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FilterQuery } from '@trungk18/project/state/filter/filter.query';
import { FilterService } from '@trungk18/project/state/filter/filter.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ProjectQuery } from '@trungk18/project/state/project/project.query';
import { JUser } from '@trungk18/interface/user';
import * as _ from 'lodash';

@Component({
  selector: 'board-filter',
  templateUrl: './board-filter.component.html',
  styleUrls: ['./board-filter.component.scss']
})
@UntilDestroy()
export class BoardFilterComponent implements OnInit {
  searchControl: FormControl = new FormControl('');
  userIds: string[];
  numberSelected: number;
  isQuickFilter: boolean;

  constructor(
    public projectQuery: ProjectQuery,
    public filterQuery: FilterQuery,
    public filterService: FilterService
  ) {
    this.userIds = [];
    this.numberSelected = 0;
    this.isQuickFilter = false;
  }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(100), distinctUntilChanged(), untilDestroyed(this))
      .subscribe((term) => {
        this.filterService.updateSearchTerm(term);
      });

    this.filterQuery.userIds$
      .pipe(untilDestroyed(this))
      .subscribe((userIds) => {
        this.userIds = userIds;
      });

    this.filterQuery.filters$
      .pipe(untilDestroyed(this))
      .subscribe((filters) => {
        this.numberSelected = _.filter(filters, (one) => one).length;
      });
  }

  isUserSelected(user: JUser) {
    return this.userIds.includes(user.id);
  }

  ignoreResolvedChanged() {
    this.filterService.toggleIgnoreResolve();
  }

  onlyMyIssueChanged() {
    this.filterService.toggleOnlyMyIssue();
  }

  userChanged(user: JUser) {
    this.filterService.toggleUserId(user.id);
  }

  toggleQuickFilterChanged() {
    this.isQuickFilter = !this.isQuickFilter;
  }

  priorityChanged() {
    this.filterService.togglePriority();
  }

  notPriorityChanged() {
    this.filterService.toggleNotPriority();
  }

  backLogOnlyChanged() {
    this.filterService.toggleBackLogOnly();
  }

  resetAll() {
    this.searchControl.setValue('');
    this.filterService.resetAll();
  }
}
