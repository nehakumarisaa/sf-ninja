### What is a @track decorator in js file?
```
It will keep track of the property’s value changes. This decorator is used to make a property private and which helps to re-render the component when the property value is changed.
```

### What options are there for Lightning Record Page assignment?
```“Lightning Pages” can be assigned at three different levels: The org default App default – this overrides the assignment done at the org level App, record type, profile – this overrides the assignment done at org level and at the App level.
```

### How do you call apex method in lwc component?
```
explain the syntax : import VARIABLENAME from '@salesforce/apex/CLASSNAME.METHODNAME';
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

### what is LDS (Lightning Data Service)?
```
-------------------------------------
- LDS is a powerful framework provided by Salesforce to interact with Salesforce data without writing any server-side code because it is built on the Lightning Platform.
-  used to interact with Salesforce data without writing any server-side code.

-  LDS consists of three parts:
    1- Lightning Record Form: used to display and edit a record in a form.
    2- Lightning Record View Form: used to display a record in a read-only form.
    3- Lightning Record Edit Form: used to edit a record in a form.

  Example 1: for viewing a record
  -------------------------------

    html file:
        <template>
            <lightning-record-view-form record-id={recordId} object-api-name="Account">
                <div class="slds-box">
                    <lightning-output-field field-name="Name"></lightning-output-field>
                    <lightning-output-field field-name="Phone"></lightning-output-field>
                    <lightning-output-field field-name="Industry"></lightning-output-field>
                </div>
            </lightning-record-view-form>
        </template>

    js file:
        import { LightningElement, api } from 'lwc';
        export default class App extends LightningElement {
            @api recordId = '0012w00000Qf2WwAAJ';
        }

    Example 2: for editing a record
    -------------------------------
    html file:
        <template>
            <lightning-record-edit-form record-id={recordId} object-api-name="Account">
                <lightning-messages></lightning-messages>
                <lightning-input-field field-name="Name"></lightning-input-field>
                <lightning-input-field field-name="Phone"></lightning-input-field>
                <lightning-input-field field-name="Industry"></lightning-input-field>
                <div class="slds-m-top slds-m-bottom_medium">
                    <lightning-button variant="brand" type="submit" name="save" label="Save"></lightning-button>
                </div>
            </lightning-record-edit-form>
        </template>

    js file:
        import { LightningElement, api } from 'lwc';
        export default class App extends LightningElement {
            @api recordId = '0012w00000Qf2WwAAJ';
        }
```

### What are the lifecycle hooks in LWC?
```
-------------------------------------
- lifecycle hooks are methods that are called at different stages of a component's lifecycle.

1- constructor(): called when the component is created 
                : used to initialize the component's properties like variables, etc.

2- connectedCallback(): called when the component is inserted into the DOM.
                      : used to get data from the server, etc.

3- renderedCallback(): called after the component is inserted and rendered in the DOM.
                     : used to perform DOM manipulation, etc.
                     : executed after every render cycle.


4- disconnectedCallback(): called when the component is removed from the DOM.
                            : used to clean up resources, etc.

5- errorCallback(): called when an error occurs in the component.
                    : used to handle errors in the component.


Example:
---------
import { LightningElement } from 'lwc';
export default class App extends LightningElement {
    constructor(){
        super();           //call the parent constructor method to initialize the component
        console.log('Constructor called');
    }

    connectedCallback(){
        console.log('Connected Callback called');
    }

    renderedCallback(){
        console.log('Rendered Callback called');
    }

    disconnectedCallback(){
        console.log('Disconnected Callback called');
    }

    errorCallback(error, stack){
        console.error(error);
    }
}

Note:
-----
- we don't need to call these methods explicitly, they are called automatically by the framework at different stages of the component's lifecycle.
- these methods are useful for performing actions at different stages of the component's lifecycle .
```

### How can two components communicate in LWC?
```
-------------------------------------------
1- Parent to Child: using @api decorator at the child component to make the property public 

Example:
---------
-  parent component:
    html file:
        <template>
            <c-child message={message}></c-child>
        </template>

    js file:
        import { LightningElement } from 'lwc';
        export default class App extends LightningElement {
            message = 'Hello World';
        }

-  child component:
    html file:
        <template>
            <p>{message}</p>
        </template>

    js file:
        import { LightningElement, api } from 'lwc';
        export default class Child extends LightningElement {
            @api message;
        }

    
2- Child to Parent: using custom events to pass data from the child component to the parent component.
                  : create a custom event in the child component and dispatch the event to the parent component.


Example:
---------
-  parent component:
    html file:
        <template>
            <c-child-component onmyevent={handleEvent}></c-child-component>
            <p>{messageFromChild}</p>
        </template>

    js file:
        import { LightningElement } from 'lwc';

        export default class ParentComponent extends LightningElement {
            messageFromChild;

            handleEvent(event) {
                this.messageFromChild = event.detail.message;
            }
        }

-  child component:
    html file:
        <template>
               <button onclick={handleClick}>Send Message to Parent</button>
        </template>

    js file:
        import { LightningElement } from 'lwc';
        export default class Child extends LightningElement {
            handleClick(){
                const event = new CustomEvent('myevent', {    //create a custom event with the name 'message' and detail 'Hello Parent'
                    detail: 'Hello Parent'
                });
                this.dispatchEvent(event);                  //dispatch the event to the parent component
            }
        }


3- Unrelated Components: using pubsub module to communicate between unrelated components.
                        : create a pubsub module to publish and subscribe to events.

Example:
---------
-  pubsub module:
    pubsub.js:
        const events = {};

        const subscribe = (eventName, callback) => {
            if (!events[eventName]) {
                events[eventName] = [];
            }
            events[eventName].push(callback);
        };

        const publish = (eventName, data) => {
            if (!events[eventName]) {
                return;
            }
            events[eventName].forEach(callback => {
                callback(data);
            });
        };

        export { subscribe, publish };

-  component 1:
    html file:
        <template>
            <button onclick={handleClick}>Send Message</button>
        </template>

    js file:
        import { LightningElement } from 'lwc';
        import { publish } from 'c/pubsub';
        export default class Component1 extends LightningElement {
            handleClick(){
                publish('message', 'Hello Component 2');
            }
        }

-  component 2:
    html file:
        <template>
            <p>{message}</p>
        </template>

    js file:
        import { LightningElement, track } from 'lwc';
        import { subscribe } from 'c/pubsub';
        export default class Component2 extends LightningElement {
            @track message;

            connectedCallback(){
                subscribe('message', (data) => {
                    this.message = data;
                });
            }
        }
```

### what is LMS (Lightning Message Service)?
```

-  LMS is a messaging service provided by Salesforce to communicate between components in the Lightning Web Components.
-  used to communicate between unrelated components in the Lightning Web Components.
- LMS consists of three parts:
    1- publisher component: used to send messages using publish() method. via a channel.
    2- subscriber component: used to receive messages using subscribe() method. via a channel.
    3- Channel: used to communicate between components.
              : used to send data to all subscribers of the channel.

Example:
---------
-  publisher component:
    html file:
        <template>
            <button onclick={handleClick}>Send Message</button>
        </template>

    js file:
        import { LightningElement } from 'lwc';
        import { publish, MessageContext } from 'lightning/messageService'; // import the publish method and MessageContext to get the message context
        import MESSAGE_CHANNEL from '@salesforce/messageChannel/MyMessageChannel__c';   // this is the message channel
        export default class Publisher extends LightningElement {

            @wire(MessageContext)  //get the message context 
            messageContext;     //store the message context

            handleClick(){
                const message = {
                    recordId: '0012w00000Qf2WwAAJ',
                    recordData: {
                        value: 'Hello World'
                    }
                };
                publish(this.messageContext, MESSAGE_CHANNEL, message);
            }
        }

-  subscriber component:
    html file:
        <template>
            <p>{message}</p>
        </template>

    js file:
        import { LightningElement, wire, track } from 'lwc';
        import { subscribe, MessageContext } from 'lightning/messageService';
        import MESSAGE_CHANNEL from '@salesforce/messageChannel/MyMessageChannel__c';
        export default class Subscriber extends LightningElement {
            @track message;

            @wire(MessageContext)
            messageContext;

            connectedCallback(){
                subscribe(this.messageContext, MESSAGE_CHANNEL, (message) => {
                    this.message = message.recordData.value;
                });
            }
        }

-  message channel:
    MyMessageChannel.messageChannel-meta.xml:
        <?xml version="1.0" encoding="UTF-8"?>
        <LightningMessageChannel xmlns="http://soap.sforce.com/2006/04/metadata">
            <masterLabel>MyMessageChannel</masterLabel>
            <isExposed>true</isExposed>
            <description>My custom message channel</description>
            <lightningMessageFields>
                <fieldName>recordId</fieldName>
                <fieldName>recordData</fieldName>
            </lightningMessageFields>
        </LightningMessageChannel>
```

### what is the difference between SLDS and LWC?
```
-  SLDS is a CSS framework used to style the components.
-  LWC is a js framework used to build web components on the Salesforce platform.
```