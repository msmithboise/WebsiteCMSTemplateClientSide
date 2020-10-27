import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarSettingsComponent } from './navbar-settings.component';

describe('NavbarSettingsComponent', () => {
  let component: NavbarSettingsComponent;
  let fixture: ComponentFixture<NavbarSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
