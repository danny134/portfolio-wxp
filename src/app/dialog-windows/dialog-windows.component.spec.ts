import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogWindowsComponent } from './dialog-windows.component';

describe('DialogWindowsComponent', () => {
  let component: DialogWindowsComponent;
  let fixture: ComponentFixture<DialogWindowsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogWindowsComponent]
    });
    fixture = TestBed.createComponent(DialogWindowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
