import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  private updateAvailable = new BehaviorSubject<boolean>(false);
  updateAvailable$ = this.updateAvailable.asObservable();

  constructor(private swUpdate: SwUpdate) {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.subscribe(() => {
        this.updateAvailable.next(true);
      });
    }
  }

  /**
   * Executa o reload forçado
   */
  activateUpdate() {
    window.location.reload();
  }
}
