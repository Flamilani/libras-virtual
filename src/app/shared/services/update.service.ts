import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UpdateService {
  private updateAvailable = new BehaviorSubject<boolean>(false);
  updateAvailable$ = this.updateAvailable.asObservable();

  private alreadyNotified = false;

  constructor(private swUpdate: SwUpdate) {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.subscribe(() => {
        this.notifyUpdate();
      });
    }
  }

  private notifyUpdate() {
    if (!this.alreadyNotified) {
      this.updateAvailable.next(true);
      this.alreadyNotified = true;
    }
  }

  /**
   * Executa o reload forçado
   */
  activateUpdate() {
    this.updateAvailable.next(false);
    this.alreadyNotified = false;
    window.location.reload();
  }
}
