import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SideMenuService{

    private sidemenudata = new Subject<any>();

    publishSomeData(data: any) {
        this.sidemenudata.next(data);
    }

    getObservable(): Subject<any> {
        return this.sidemenudata;
    }
}