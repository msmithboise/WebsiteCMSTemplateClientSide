import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPageModalComponent } from './custom-page-modal.component';

describe('CustomPageModalComponent', () => {
  let component: CustomPageModalComponent;
  let fixture: ComponentFixture<CustomPageModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomPageModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomPageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
