import { waitForAsync , ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
//import { TreeViewModule } from "ionic-tree-view";
import { AddnewproductComponent } from './addnewproduct.component';

describe('AddnewproductComponent', () => {
  let component: AddnewproductComponent;
  let fixture: ComponentFixture<AddnewproductComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddnewproductComponent ],//TreeViewModule
      imports: [IonicModule.forRoot(),]//TreeViewModule.forRoot()
    }).compileComponents();

    fixture = TestBed.createComponent(AddnewproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


