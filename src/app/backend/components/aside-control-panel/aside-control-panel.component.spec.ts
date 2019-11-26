import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsideControlPanelComponent } from './aside-control-panel.component';

describe('AsideControlPanelComponent', () => {
  let component: AsideControlPanelComponent;
  let fixture: ComponentFixture<AsideControlPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsideControlPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsideControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
