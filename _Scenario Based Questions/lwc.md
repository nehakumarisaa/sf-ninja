### What is a @track decorator in js file?
```
It will keep track of the property’s value changes. This decorator is used to make a property private and which helps to re-render the component when the property value is changed.
```

### How do you call apex method in lwc component?
```
explain the syntax : import VARIABLENAME from '@salesforce/apex/CLASSNAME.METHODNAME';
```

### Can you give an example of how you have used the Lightning Data Service in a Lightning Web Component?
```
<template>
    <lightning-record-form object-api-name="Account"
                           layout-type="Full"
                           columns="2"
                           mode="edit"
                           onsuccess={handleSuccess}>
    </lightning-record-form>
</template>

import { LightningElement } from 'lwc';
export default class CreateAccount extends LightningElement {
    handleSuccess(event) {
        // Account record has been created
        // You can get the recordId from the event.detail.id
        const recordId = event.detail.id;
        console.log('New Account created with Id: ' + recordId);
    }
}
```

### How do you ensure the performance and scalability of a Lightning Web Component in a large-scale Salesforce org?
```
- Minimize the use of Apex controllers and rely on client-side logic as much as possible to reduce server load.
- Optimize the component’s data loading and rendering by using lazy loading, pagination, and caching techniques.
- Utilize the Salesforce Performance Resource Bundle to reduce the number of network requests and improve the loading speed of the component.
- Test the component’s performance in a large data set to identify and fix any performance bottlenecks.
- Use the Salesforce Lightning Locker service to isolate the component’s code and data from other components and protect against cross-site scripting attacks.
- Ensure the code is clean, efficient, and follows best practices.
- Monitor the component’s performance regularly and make adjustments as necessary.
```