### What is report type?
```
In Salesforce, reports are created by first selecting a report type. A report type is a template which defines the objects and fields that will be available to use in the report you create.
```

### Difference Between Lookup & Master Detail Relationship in salesforce?
```
Value is always required in master details and there is no such a condition for lookup. If master record is deleted then its child record is also gets deleted whereas no such a criteria for lookup relationship. Master/detail children inherit their permissions from their parent. You can convert a master-detail relationship to a lookup relationship as long as no roll-up summary fields exist on the master object. You can convert a lookup relationship to a master-detail relationship, but only if the lookup field in all records contains a value.
```

### Difference between summary and matrix report in salesforce?
```
In short if you need to do the sum or calculate the average on even one parameter then summary report is the answer. Matrix Reports:- These reports are used when the requirement is to summarize both the Axis i.e. when requirement is to group both Rows as well as Columns.
```

### Difference between Business and Person Accounts
```
http://sfdcsrini.blogspot.com/2014/12/person-account-and-business-account-in.html#:~:text=The%20basic%20difference%20between%20these,on%20which%20they%20are%20based.&text=In%20Person%20account%20record%20type,related%20list%20will%20be%20present.
```

### Can we convert MDR to Lookup or Vice Versa?
```
- Yes, we can Convert MDR to Lookup and Vice Versa we just need to keep in find the Rules associated to them while converting a Relationship to other type.
- MDR to Lookup : Hard Delete Rollup summary fields.
- Lookup to MDR: All child must have a Parent.
```
