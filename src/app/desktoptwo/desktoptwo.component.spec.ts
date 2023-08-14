import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktoptwoComponent } from './desktoptwo.component';

describe('DesktoptwoComponent', () => {
  let component: DesktoptwoComponent;
  let fixture: ComponentFixture<DesktoptwoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DesktoptwoComponent]
    });
    fixture = TestBed.createComponent(DesktoptwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
