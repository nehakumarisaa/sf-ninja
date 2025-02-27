### Write an Apex trigger to update the Account Rating to 'Hot' if the Account has more than 5 Opportunities. How would you test this trigger?
```
Apex Trigger:
-------------
trigger OpportunityTrigger on Opportunity(after insert, after update, after delete , after undelete){ 
    if(Trigger.isAfter && (Trigger.isInsert || Trigger.isUpdate || Trigger.isDelete || Trigger.isUndelete)){
        OpportunityTriggerHandler.updateAccountRating(Trigger.isDelete ? Trigger.old : Trigger.new);
    } 
}
Apex Trigger Handler Class:
----------------------------
public class OpportunityTriggerHandler {
    public static void updateAccountRating(list<Opportunity> opps){
        list<Id> accIds= new List<Id>();
        for(Opportunity opp:Opps){
            accIds.add(opp.AccountId);
        } 
        //object k-v pairs
        list<AggregateResult> relatedOpps = [SELECT AccountId , COUNT(Id)
                                               FROM Opportunity
                                               WHERE AccountId IN:accIds
                                               AND Account.Rating != 'Hot'
                                               GROUP BY AccountId
                                               HAVING COUNT(Id) > 5];
        if(!relatedOpps.isEmpty()){
        list<Id> accIdsToUpdate = new list<Id>();
        for(AggregateResult ar:relatedOpps){
            accIdsToUpdate.add((Id) ar.get('AccountId'));
        }     
        List<Account> accountsToUpdate = [SELECT name, Rating, Id FROM Account WHERE Id IN:accIdsToUpdate];    
        for(Account acc:accountsToUpdate){
            acc.Rating = 'Hot';
        }     
        update accountsToUpdate; 
       }
    }
}
```

### When Maximum Trigger Depth Exceeded Error comes ?
```
Ans : When trigger goes to recursive loop, that means trigger called itself back to back. we can solve this by static boolean variable (see resolve recursion)
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

### Question: prevent deletion of account if its have more than 2 contacts
<https://github.com/therishabh/salesforce-apex>
```
trigger AccountTrigger on Account(before delete){
    if(Trigger.isBefore){
        if(Trigger.isDelete){
            AccountTriggerHandler.preventDelete(Trigger.Old)
        }
    }
}

public class AccountTriggerHandler{
    public static void preventDelete(List<Account> accList){
        
        Set<Id> accountIdsSet = new Set<Id>();

        for(Account acc: accList){
            accountIdsSet.add(acc.Id);
        }


        List<Account> accWitCon = [SELECT Id, (SELECT Id FROM Contacts) FROM Account WHERE Id IN :accountIdsSet HAVING Count(Contacts) > 2];

        Set<Id> accountWithConIdsSet = new Set<Id>();
        for(Account acc: accWitCon){
            accountWithConIdsSet.add(acc.Id);
        }

        for(Account acc: accList){
            if(accountWithConIdsSet.contains(acc.Id)){
                acc.addError('You can not delete this account, because it has more than 2 contants')
            }
        }
    }
}
```