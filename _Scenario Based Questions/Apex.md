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