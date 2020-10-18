import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPageSettingsComponent } from './edit-page-settings.component';

describe('EditPageSettingsComponent', () => {
  let component: EditPageSettingsComponent;
  let fixture: ComponentFixture<EditPageSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPageSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPageSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
