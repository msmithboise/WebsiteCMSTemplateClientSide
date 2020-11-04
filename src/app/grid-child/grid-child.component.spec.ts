import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridChildComponent } from './grid-child.component';

describe('GridChildComponent', () => {
  let component: GridChildComponent;
  let fixture: ComponentFixture<GridChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
