import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerVisonComponent } from './computer-vison.component';

describe('ComputerVisonComponent', () => {
  let component: ComputerVisonComponent;
  let fixture: ComponentFixture<ComputerVisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComputerVisonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComputerVisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
