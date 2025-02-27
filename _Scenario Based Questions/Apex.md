#### In how many ways can you Invoke Apex?
```
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
```

### the order of execution
```
1- load the record from the database if it is an update or delete operation
    or create a new record if it is an insert operation using UI or API.

2- system validation rules
  ex: required fields, unique fields, field format, max length, etc.

3- before save flow 
    - before the record is saved to the database, the before triggers, validatio

4- before triggers(before insert, before update, before delete)
    -because these triggers can modify the record before it is saved to the database
   ex: Ensure the Account Name is in uppercase before saving the record.
     : add a default value to a field if it is blank before saving the record.

5- custom validation rules and system validation rules
    - run again because the record may have been modified by the before triggers.
    ex: prevent users from entering an email address without the @ symbol.
      : prevent users from entering a phone number without the correct format.

6-Duplicate rules
    -to prevent duplicate records from being saved to the database.

7- (Record saved + Id )but not yet committed to the database
    - to allow all after triggers to run before the record is saved to the database.
    - if there are any errors, the record is not saved to the database and it will rollback the transaction.

8- after triggers(after insert, after update, after delete)
    - used to perform operations after the record is saved to the database.

   ex: send an email notification after a new oppointment is created.

9- Assignment rules
    - if the record is a lead or case, the assignment rules are executed to assign the record to a user or queue.

10- auto-response rules
    - if the record is a lead or case, the auto-response rules are executed to send an automatic email response.

11- workflow rules
    - used to automate standard internal procedures and processes to save time across your org.

12- process builder and flows
    - used to automate business processes and workflows.

13- escalation rules    
    - used to escalate cases based on certain criteria.

14- entitlement rules
    - used to enforce service level agreements (SLAs) for cases.

15- Recorder triggered flows(after save flow)
    - after the record is saved to the database, the after save flow is executed.

16- Roll-up summary fields
    - used to calculate the sum, minimum, or maximum value of a field in related records.

17- Criteria-based sharing rules
    - used to share records with users based on certain criteria.

18- commit DML operation to the database
    - if all operations are successful, the record is saved to the database.

19- post-commit logic
    - used to perform operations after the record is saved to the database.
    Ex: send an email notification after a new record is created.
```

### How to enable field- and object-level security permissions checking for SOQL
```
Use the WITH SECURITY_ENFORCED clause to enable field- and object-level security permissions checking for SOQL SELECT queries in Apex code, including subqueries and cross-object relationships.
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
```
No
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

### what is the SOQL injection and how to prevent it?
```
- is a type of attack where the attacker can insert code into soql query to get unauthorized access to the data.

- Example:
    - SELECT Id, Name FROM Account WHERE Name = ' + name + '
    - if the attacker enters the value as ' OR '1' = '1, the query will become:
      SELECT Id, Name FROM Account WHERE Name = '' OR '1' = '1'

- To prevent SOQL injection:
    - Use bind variables in the query to avoid concatenating the query string.
    - Example:
        String name = 'Test Account';
        Account acc = [SELECT Id, Name FROM Account WHERE Name = :name LIMIT 1];

- Use the escapeSingleQuotes() method to escape single quotes in the input string.
    - Example:
        String name = 'Test Account';
        name = String.escapeSingleQuotes(name);
        Account acc = [SELECT Id, Name FROM Account WHERE Name = :name LIMIT 1];

- Use the Database.query() method to execute dynamic SOQL queries.
    - Example:
        String query = 'SELECT Id, Name FROM Account WHERE Name = \'' + name + '\' LIMIT 1';
        Account acc = Database.query(query);
```

### When an Account’s status changes to ‘Inactive’, all related Opportunities should be marked as ‘Closed Lost’. How would you accomplish this?
```
Apex Trigger:
-------------
trigger AccountTrigger on Account (after update){
    if(Trigger.isAfter && Trigger.isUpdate){
        AccountTriggerHandler.updateRelatedOpportunities(Trigger.newMap, Trigger.oldMap);
    }
}
Apex Trigger Handler Class:
----------------------------
public class AccountTriggerHandler {
    public static void updateRelatedOpportunities(Map<Id, Account> newAccounts, Map<Id, Account> oldAccounts){
       
        set<Id> inactiveAccountIds = new set<Id>();
        for(Id accId : newAccounts.keySet()){
            if(newAccounts.get(accId).Status__c == 'Inactive' && oldAccounts.get(accId).Status__c != 'Inactive'){
                inactiveAccountIds.add(accId);
            }
        }    
        if(!inactiveAccountIds.isEmpty()){
            List<Opportunity> oppsToUpdate = [SELECT Id, StageName FROM Opportunity WHERE AccountId IN :inactiveAccountIds AND StageName != 'Closed Lost'];
            for(Opportunity opp : oppsToUpdate){
                opp.StageName = 'Closed Lost';
            }
            if(!oppsToUpdate.isEmpty()){
                update oppsToUpdate;
            }            
        }  
}
```

### A company wants to prevent the deletion of Account records that have related Opportunities. How would you implement this using a trigger?
```


Apex Trigger:
-------------
trigger AccountTrigger on Account (before delete){
    if(Trigger.isBefore && Trigger.isDelete){
        AccountTriggerHandler.preventAccountDeletion(Trigger.old);
    }
}
Apex Trigger Handler Class:
----------------------------
public class AccountTriggerHandler{  
    public static void preventDelteAccountWithRelatedOpps(map<Id, Account> oldAccounts){ 
        set<Id> accIds = oldAccounts.keySet();   
        List<Opportunity> RelatedOpps = [SELECT  AccountId FROM Opportunity WHERE AccountId In:accIDs]; 
        List<Id> accWithRelatedOpp = new list<Id>();
        for(Opportunity opp:RelatedOpps){
            accWithRelatedOpp.add(opp.AccountId);
        }
        for(Id accId:accIds){
            if(accWithRelatedOpp.contains(accId)){
                oldAccounts.get(accId).addError('cant delete this account because there is related opportunity');
                
            }
        }
    }
}
```