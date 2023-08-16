import { Injectable } from '@angular/core';
import { FilterStore, createInitialFilterState } from './filter.store';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  constructor(private store: FilterStore) {}

  updateSearchTerm(searchTerm: string) {
    this.store.update({
      searchTerm
    });
  }

  toggleUserId(userId: string) {
    this.store.update((state) => {
      const hasUser = state.userIds.includes(userId);
      const userIds = hasUser
        ? state.userIds.filter((x) => x !== userId)
        : [...state.userIds, userId];
      return {
        ...state,
        userIds
      };
    });
  }

  toggleOnlyMyIssue() {
    this.store.update((state) => {
      const onlyMyIssue = !state.onlyMyIssue;
      return {
        ...state,
        onlyMyIssue
      };
    });
  }

  toggleIgnoreResolve() {
    this.store.update((state) => {
      const ignoreResolved = !state.ignoreResolved;
      return {
        ...state,
        ignoreResolved
      };
    });
  }

  togglePriority() {
    this.store.update((state) => {
      const priority = !state.priority;
      return {
        ...state,
        priority
      };
    });
  }

  toggleNotPriority() {
    this.store.update((state) => {
      const notPriority = !state.notPriority;
      return {
        ...state,
        notPriority
      };
    });
  }

  toggleBackLogOnly() {
    this.store.update((state) => {
      const backLogOnly = !state.backLogOnly;
      return {
        ...state,
        backLogOnly
      };
    });
  }

  resetAll() {
    this.store.update((state) => ({
      ...state,
      ...createInitialFilterState()
    }));
  }
}
