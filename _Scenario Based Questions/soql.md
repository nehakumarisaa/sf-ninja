### Retrieve Accounts Created in the Last 30 Days
```
SELECT Id, Name FROM Account WHERE CreatedDate = LAST_N_DAYS:30
```

### Query for Accounts Without Related Contacts
```
SELECT Id, Name FROM Account WHERE Id NOT IN (SELECT AccountId FROM Contact)
```

### Query Accounts with Multiple Related Opportunities
```
SELECT AccountId, COUNT(Id) FROM Opportunity GROUP BY AccountId HAVING COUNT(Id) > 1
```

### Only counts records with unique values these values are repeated in all remaining records
SELECT COUNT_DISTINCT(Rating) FROM Account

### we can't filter in the subquery because it returns a list of records not a single record. EX: SELECT Name, (SELECT LastName FROM Contacts WHERE LastName = 'Smith') FROM Account // Error
```
    solution:
    ---------
    - we have to filter in the main query not in the subquery
    - use the IN operator to filter the records
    SELECT Name, (SELECT LastName FROM Contacts)
    FROM Account WHERE Id IN (SELECT AccountId FROM Contact WHERE LastName = 'Smith')
```

### we can't compare fields from different objects in SOQL query directly because the fields are not available in the same context. EX: SELECT Name, Account.BillingState FROM Contact WHERE Account.BillingState = 'California' // Error
```
    solution:
    ---------
    - we have to fetch the data and compare it in the apex code
    List<Contact> contacts = [SELECT Id, Name, Account.BillingState FROM Contact];
    for(Contact con : contacts) {
        if(con.Account.BillingState == 'California') {
            System.debug(con.Name);
        }
    }
```

### we can't use aggregate functions in subqueries. EX: SELECT Name, (SELECT COUNT(Id) FROM Contacts) FROM Account 
```
    solution:
    ---------
    - we have to use the aggregate functions in the root query not in the subquery
    SELECT AccountId, COUNT(Id) 
    FROM Contact
    GROUP BY AccountId
```

### Find the Account with the maximum number of Opportunities.
```
    SELECT AccountId, COUNT(Id)
    FROM Opportunity
    GROUP BY AccountId
    ORDER BY COUNT(Id) DESC
    LIMIT 1
```

### Retrieve the names of all Accounts that have both Opportunities and Cases associated with them.
```
    SELECT Name 
    FROM Account
    WHERE Id IN (SELECT AccountId FROM Opportunity) AND Id IN (SELECT AccountId FROM Case)
```