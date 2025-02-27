import { LightningElement, wire } from 'lwc';
import {
    registerRefreshHandler,
    unregisterRefreshHandler
} from 'lightning/refresh';
import { refreshApex } from '@salesforce/apex';

export default class RefreshViewApi extends LightningElement {}