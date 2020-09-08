import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditContentModalComponent } from './edit-content-modal.component';

describe('EditContentModalComponent', () => {
  let component: EditContentModalComponent;
  let fixture: ComponentFixture<EditContentModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditContentModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditContentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
