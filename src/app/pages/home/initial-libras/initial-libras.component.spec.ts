import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialLibrasComponent } from './initial-libras.component';

describe('InitialLibrasComponent', () => {
  let component: InitialLibrasComponent;
  let fixture: ComponentFixture<InitialLibrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InitialLibrasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InitialLibrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
