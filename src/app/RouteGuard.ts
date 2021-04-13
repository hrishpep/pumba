import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { QAuthService } from "./qauth.service";
import { Router } from '@angular/router'
import { Route } from "@angular/compiler/src/core";
import { Injectable } from "@angular/core";
import { Subject } from 'rxjs'

@Injectable()
export class RouteGuard implements CanActivate {

    private qAuth:QAuthService;
    private router: Router;
    constructor(_qauth:QAuthService, _router:Router){
        console.log('called Route')
        this.qAuth = _qauth;
        this.router = _router
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Subject<boolean> {
       
        this.qAuth.isSignedIn().subscribe(status =>
                {
                    if(!status)
                        this.router.navigate(['/signup'])
                }
        )
        return this.qAuth.isSignedIn()
    }
  }
