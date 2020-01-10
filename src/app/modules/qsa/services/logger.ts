import {isDevMode} from '@angular/core';

export class Logger {

    public static i(className: any, message: any, ...optionalParams: any[]): void {
        if (isDevMode()) {
            console.info(this.createMessage('INFO', className, message), optionalParams);
        }
    }

    public static e(className: any, message: any, ...optionalParams: any[]): void {
        if (isDevMode()) {
            console.info(this.createMessage('ERROR', className, message), optionalParams);
        }
    }

    public static w(className: any, message: any, ...optionalParams: any[]): void {
        if (isDevMode()) {
            console.info(this.createMessage('WARN', className, message), optionalParams);
        }
    }

    private static createMessage(level: string, className: any, message: any): string {
        return this.getTime() + ' [' + level + '] ' + className.constructor.name + ' - [' + message + ']';
    }

    private static getTime(): string {
        let date = new Date();
        return '[' + date.getHours() + ':' +
            ('0' + date.getMinutes()).slice(-2) + ':' +
            ('0' + date.getSeconds()).slice(-2) + '.' +
            ('00' + date.getMilliseconds()).slice(-3) + ']';
    }
}
