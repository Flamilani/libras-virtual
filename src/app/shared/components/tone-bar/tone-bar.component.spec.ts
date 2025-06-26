import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToneBarComponent } from './tone-bar.component';

describe('ToneBarComponent', () => {
  let component: ToneBarComponent;
  let fixture: ComponentFixture<ToneBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [ToneBarComponent]
});
    fixture = TestBed.createComponent(ToneBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
