import {
    it,
    inject,
    describe,
    expect,
    beforeEach,
    beforeEachProviders
} from '@angular/core/testing';
import { LoggerService } from '../../../client/app/blocks/logger.service';

describe('AppComponent', () => {
    beforeEachProviders(() => [LoggerService]);
    beforeEach(() => {
        spyOn(console, 'log');
    });

    it('should log successfully', inject([LoggerService], (logger) => {
        let message = 'Hello';
        logger.log(message);
        expect(console.log).toHaveBeenCalledWith(message);
    }));
});
