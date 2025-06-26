import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrettingComponent } from './gretting.component';

describe('GrettingComponent', () => {
  let component: GrettingComponent;
  let fixture: ComponentFixture<GrettingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [GrettingComponent]
});
    fixture = TestBed.createComponent(GrettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
