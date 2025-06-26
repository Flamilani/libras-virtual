import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameWordSearchComponent } from './game-word-search.component';

describe('GameWordSearchComponent', () => {
  let component: GameWordSearchComponent;
  let fixture: ComponentFixture<GameWordSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [GameWordSearchComponent]
});
    fixture = TestBed.createComponent(GameWordSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
