#### In how many ways can you Invoke Apex?
We invoke Apex in the following ways:
1. Executing Synchronously
	1. Execute Anonymous Window
	2. Trigger
2. Executing Asynchronously
	1. Future Methods
	2. Queueable Apex
	3. Batch Apex
	4. Scheduled Apex
3. Other ways
	1. Exposing Apex Methods as SOAP Web Services
	2. Exposing Apex Classes as REST Web Services
	3. Visualforce Classes
	4. Lightning Web Components

### How to enable field- and object-level security permissions checking for SOQL
```
Use the WITH SECURITY_ENFORCED clause to enable field- and object-level security permissions checking for SOQL SELECT queries in Apex code, including subqueries and cross-object relationships.
```

### Trigger to check duplicate Email ids on contact
```
trigger AvoidDuplicate on contact (before insert,before update) { 
    set setEmail = new set(); 
    set setExistingEmail = new set();
    //Add alll email in set to fetch related existing records 
    for(Contact con : Trigger.new) { 
        setEmail.add(con.email);
    }
    // get all records in database. 
    for(Contact con : [select email from contact where email in : setEmail]) { 
        setExistingEmail.add(con.email); 
    }

    //compare and add error if already exist 
    if(Trigger.isInsert||Trigger.isUpdate){ 
        for(contact a:trigger.new) { 
            if(setExistingEmails.contains(a.email)) { 
                a.Email.adderror('This email already exists'); 
            } 
        } 
    }
}
```

### How to log status of a completed Batch Job Status
```
global void finish(Database.BatchableContext BC){
   // Get the ID of the AsyncApexJob representing this batch job
   // from Database.BatchableContext.
   // Query the AsyncApexJob object to retrieve the current job's information.
   AsyncApexJob a = [SELECT Id, Status, NumberOfErrors, JobItemsProcessed,
      TotalJobItems, CreatedBy.Email,ExtendedStatus,JobType,ApexClassId,MethodName,
      FROM AsyncApexJob WHERE Id =
      :BC.getJobId()];

   // Send an email to the Apex job's submitter notifying of job completion.
   Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
   String[] toAddresses = new String[] {a.CreatedBy.Email};
   mail.setToAddresses(toAddresses);
   mail.setSubject('Batch Class Status ' + a.Status);
   mail.setPlainTextBody('The batch Apex job processed ' + a.TotalJobItems +
   ' batches with '+ a.NumberOfErrors + ' failures.'+
   '\n' + ' Apex Class:' + a.ApexClassId);
    Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail }); 
}
```

###  Clone record in apex

# BATCH APEX
### How to Execute the Batch Apex Class for Every 30 minutes?
```
We can achieve using System.schedule method.
Below is the Example – we need to execute this from the system log or anonymous apex section of the IDE:
batchApexMethod exeClass = new batchApexMethod();
String cronStr = '0 0,30 * * * *';
System.schedule('Process Accs Job', cronStr, exeClass);
```

### If we have 5 transactions of 200 records each and if 1st succeeds, while 2nd fails, will the db updates from 1st transaction be rolled back?
```No
```

### What is Database.Stateful, when is it helpful? What happens to a static and a instance variable when it is declared?
```
Allows to maintain state across transactions. Instance retain their value, static does not. Useful in counting or summarizing records as they are processed. Without it, all static and instance member variables are set back to their original values.
```

### If the batch requires 10k executions, and the remaining asynchronous limit if 9500 executions, what happens?
```
AsyncApexExecutions Limit exceeded exception is thrown, and the remaining executions are left unchanged
```

### What happens if more than 50million records are returned in Database.querylocator?
```
The batch job is immediately terminated and marked as Failed
```

### We have a nested SOQL in Database.queryLocator - select Id, (select id from contacts) from Account
```
Perform the subquery separately, from within the execute method. It allows the batch job to run run using the faster, chunking implementation.
```

### What is FOR UPDATE and can we use in queryLocator method?
```
If we use FOR UPDATE in the SOQL then the Records that are fetched are Locked i.e. no one can modify them till the Transaction is completed.

It can't be used in queryLocator. We can instead use this in EXECUTE method, by requerying the Id field from the batch job's main query locator, in execute. 
```

### I have two batch classes, say A and B and I have added B in finish() method of A. But A batch gets failed, Will the Batch B run ?
```
No, Batch B will not run if Batch A fails before reaching the finish() method.
```

### Is there is any way through which we can call future method from batch apex?
```
As we know that a webservice can be called from batch class and webservice can call @future method. So in your batch class call webservice and which can call your @future method.         
Also you can call future method from finish method in batch class.
```

### What is Database.AllowCallouts?
```
To use a callout in batch Apex, you must specify Database.AllowsCallouts in the class definition. For example:
global class SearchAndReplace implements Database.Batchable<sObject>,
   Database.AllowsCallouts{
              //Business logic you want by implementing Batchable interface methods
}
Callouts include HTTP requests as well as methods defined with the webService keyword.
```

# ASYNCHRONOUS OPERATIONS
### Is it possible to do Synchronous Web service callouts from scheduled apex?
```
No.
Synchronous Web service callouts are not supported from scheduled Apex. To be able to make callouts, make an asynchronous callout by placing the callout in a method annotated with @future(callout=true) and call this method from scheduled Apex. However, if your scheduled Apex executes a batch job, callouts are supported from the batch class.
```

### Can we call future method from batch apex (from execute method)?
```
No
```