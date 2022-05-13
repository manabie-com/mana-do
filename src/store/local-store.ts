import { AppState } from './reducer';
export class LocalStore {
  private static readonly storeKey: string = 'state';

  static get isInitialized(): boolean {
    return !!localStorage.getItem(this.storeKey);
  }

  static setCachedState = (state: AppState): void => {
    const stringifiedState = JSON.stringify(state);
    localStorage.setItem(this.storeKey, stringifiedState);
  }

  static getCachedState = (): AppState => {
    const stringifiedState = localStorage.getItem(this.storeKey) || '{}';
    return JSON.parse(stringifiedState);
  }
}