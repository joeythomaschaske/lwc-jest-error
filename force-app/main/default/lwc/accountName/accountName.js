import { LightningElement, api, wire } from 'lwc';
import { ValidationMixin } from 'c/forms';
import { getRecord, getFieldValue, updateRecord } from 'lightning/uiRecordApi';
import ACCOUNT_NAME from '@salesforce/schema/Account.Name';

export default class AccountName extends ValidationMixin(LightningElement) {
    @api
    recordId;

    newName = '';

    @wire(getRecord, { recordId: '$recordId', fields: [ACCOUNT_NAME] })
    wiredAccount

    [ValidationMixin.Selectors] = ['lightning-input'];

    get name() {
        return getFieldValue(this.wiredAccount.data, ACCOUNT_NAME);
    }

    save() {
        if (!this.checkValidity()) {
            alert('Please enter a name');
        } else {
            updateRecord({ fields: { Id: this.recordId, Name: this.newName }});
        }
    }

    handleNameChange(event) {
        this.newName = event.target.value;
    }
}