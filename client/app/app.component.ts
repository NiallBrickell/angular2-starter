import {Component, OnInit} from '@angular/core';
import {Routes, Router, ROUTER_DIRECTIVES} from '@angular/router';
import {APP_ROUTES} from './app.routes';
import {NavbarComponent} from './navbar/navbar.component';
import {LoggerService} from './blocks/logger.service';

@Component({
    selector: 'as-main-app',
    templateUrl: 'app/app.html',
    directives: [ROUTER_DIRECTIVES, NavbarComponent]
})
@Routes(APP_ROUTES)
export class AppComponent implements OnInit {
    public appRoutes: any[];
    private logger: LoggerService;

    constructor(logger: LoggerService, private router: Router) {
        this.logger = logger;
        this.appRoutes = APP_ROUTES;
    }

    ngOnInit() {
		this.router.navigate(['/']);
    }
}
