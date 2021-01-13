import { createElement } from 'lwc';
import AccountName from 'c/accountName';
import { registerLdsTestWireAdapter } from '@salesforce/sfdx-lwc-jest';
import { getRecord } from 'lightning/uiRecordApi';

const getRecordWireAdapter = registerLdsTestWireAdapter(getRecord);
const mockGetRecord = require('./data/getRecord.json');

describe('c-account-name', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('shows a spinner when data is loading', () => {
        const element = createElement('c-account-name', {
            is: AccountName
        });
        document.body.appendChild(element);
        const spinner = element.shadowRoot.querySelector('lightning-spinner');
        expect(spinner).toBeTruthy();
    });

    it('shows the account name when data is loaded', async () => {
        const element = createElement('c-account-name', {
            is: AccountName
        });
        document.body.appendChild(element);
        getRecordWireAdapter.emit(mockGetRecord);

        await Promise.resolve();

        const name = element.shadowRoot.querySelector('h1')
        expect(name).toBeTruthy();
        expect(name.textContent).toEqual('Yo, Account Name');
    });
});