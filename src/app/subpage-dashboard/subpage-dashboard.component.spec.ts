import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubpageDashboardComponent } from './subpage-dashboard.component';

describe('SubpageDashboardComponent', () => {
  let component: SubpageDashboardComponent;
  let fixture: ComponentFixture<SubpageDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubpageDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubpageDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
