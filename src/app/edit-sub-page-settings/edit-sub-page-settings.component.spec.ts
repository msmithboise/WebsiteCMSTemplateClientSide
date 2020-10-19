import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSubPageSettingsComponent } from './edit-sub-page-settings.component';

describe('EditSubPageSettingsComponent', () => {
  let component: EditSubPageSettingsComponent;
  let fixture: ComponentFixture<EditSubPageSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSubPageSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSubPageSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
