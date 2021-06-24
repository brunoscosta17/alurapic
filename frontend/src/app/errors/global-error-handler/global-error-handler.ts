import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ErrorHandler, Injectable, Injector, Type } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/user/user.service';
import { environment } from 'src/environments/environment';
import * as stacktrace from 'stacktrace-js';
import { ServerLogService } from './server-log.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    
    constructor(private injector: Injector) {}
    
    handleError(error: any): void {

        const location = this.injector.get(LocationStrategy as Type<LocationStrategy>);

        const userService = this.injector.get(UserService);
        
        const serverLogService = this.injector.get(ServerLogService);

        const router = this.injector.get(Router);

        const url = location instanceof PathLocationStrategy ? location.path() : '';

        const message = error.message ? error.message : error.toString();

        if(environment.production) router.navigate(['/error']);
        
        stacktrace
            .fromError(error)
            .then((stackFrames) => {
                const stackAsString = stackFrames
                    .map(sf => sf.toString())
                    .join('\n');

                console.log(message);
                console.log(stackAsString);
                console.log({ message, url, userName: userService.getUserName(), stack: stackAsString });
                serverLogService.log(
                    {
                        message,
                        url,
                        userName: userService.getUserName(),
                        stack: stackAsString 
                    }
                ).subscribe(
                    () => console.log('Error logged on server!'))
                    error => {
                        console.log(error);
                        console.log('Fail to send error log to server!');
                    };
            });
    }

}