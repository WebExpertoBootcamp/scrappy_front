import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MysuscriptionComponent } from './mysuscription.component';

describe('MysuscriptionComponent', () => {
  let component: MysuscriptionComponent;
  let fixture: ComponentFixture<MysuscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MysuscriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MysuscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
