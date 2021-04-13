import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VpkprofilePage } from './vpkprofile.page';

describe('VpkprofilePage', () => {
  let component: VpkprofilePage;
  let fixture: ComponentFixture<VpkprofilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VpkprofilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VpkprofilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
