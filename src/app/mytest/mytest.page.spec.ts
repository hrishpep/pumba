import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MytestPage } from './mytest.page';

describe('MytestPage', () => {
  let component: MytestPage;
  let fixture: ComponentFixture<MytestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MytestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MytestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
