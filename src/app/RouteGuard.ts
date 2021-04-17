import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { QAuthService } from "./qauth.service";
import { Router } from '@angular/router'
import { Route } from "@angular/compiler/src/core";
import { Injectable } from "@angular/core";
import { Subject } from 'rxjs'
import { ThrowStmt } from "@angular/compiler";

@Injectable()
export class RouteGuard implements CanActivate {

    private qAuth:QAuthService;
    private router: Router;
    private status:boolean;
    constructor(_qauth:QAuthService, _router:Router){
        console.log('called Route')
        this.qAuth = _qauth;
        this.router = _router
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
       
        this.qAuth.isSignedIn().subscribe(status =>
                {
                    console.log('now got status', status)
                    if(!status)
                        this.router.navigate(['signup'])
                    this.status = status;
                }
        )
        /*
        if(this.status == null)
            return this.qAuth.isSignedIn()
        else return this.status;
        */
       return true;
    }
  }
