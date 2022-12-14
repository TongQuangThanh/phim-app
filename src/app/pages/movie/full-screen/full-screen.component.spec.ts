/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FullScreenComponent } from './full-screen.component';

describe('FullScreenComponent', () => {
  let component: FullScreenComponent;
  let fixture: ComponentFixture<FullScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
