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