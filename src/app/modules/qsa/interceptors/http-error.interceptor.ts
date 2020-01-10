import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/internal/operators';
import {Logger} from '../services/logger';
import {NotificationService} from '../services/notification.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(private router: Router,
                private notificationService: NotificationService,
                private translateService: TranslateService) {
    }

    private static isErrorCodeZero(error: any): boolean {
        return error.status === 0;
    }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError((error, caught) => {
            Logger.e(this, 'HTTP error occurred', error, caught);
            this.showToast(error);
            return of(error);
        }) as any);
    }

    private showToast(error): void {
        if (HttpErrorInterceptor.isErrorCodeZero(error)) {
            this.handleErrorCodeZero();
        } else {
            this.notificationService.showToastError(error.error.error);
        }
    }

    private handleErrorCodeZero(): void {
        this.translateService.get('errorOccurred').subscribe(
            translations => this.notificationService.showToastError(translations));
    }
}
