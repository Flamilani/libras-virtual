import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrowsComponent } from './arrows.component';

describe('ArrowsComponent', () => {
  let component: ArrowsComponent;
  let fixture: ComponentFixture<ArrowsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [ArrowsComponent]
});
    fixture = TestBed.createComponent(ArrowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
