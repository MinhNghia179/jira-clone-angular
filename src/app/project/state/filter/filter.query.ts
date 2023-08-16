import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { FilterStore, FilterState } from './filter.store';

@Injectable({ providedIn: 'root' })
export class FilterQuery extends Query<FilterState> {
  any$ = this.select(
    ({
      searchTerm,
      userIds,
      onlyMyIssue,
      ignoreResolved,
      priority,
      notPriority,
      backLogOnly
    }) =>
      !!searchTerm ||
      !!userIds?.length ||
      onlyMyIssue ||
      ignoreResolved ||
      priority ||
      notPriority ||
      backLogOnly
  );

  all$ = this.select();
  userIds$ = this.select('userIds');
  onlyMyIssue$ = this.select('onlyMyIssue');
  ignoreResolve$ = this.select('ignoreResolved');
  priority$ = this.select('priority');
  notPriority$ = this.select('notPriority');
  backLogOnly$ = this.select('backLogOnly');

  filters$ = this.select(({ searchTerm, userIds, ...rest }) => rest);

  constructor(protected store: FilterStore) {
    super(store);
  }
}
