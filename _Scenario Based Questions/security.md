### Difference between salesforce profile and permission sets
```
You can assign permission set as many users you want. The difference between Profile and Permission Sets is Profiles are used to restrict from something where Permission Set allows user to get extra permissions.
```

### Which advanced tools can Salesforce enable for large-scale role hierarchy realignments in organizations with large data volumes?
```
Parallel Sharing Rule Recalculation, Granular Locking, Deferred Sharing Rule
```

### Ownership data skew. If a single user owns more than 10k records of an object. What happens?
```
https://developer.salesforce.com/docs/atlas.en-us.draes.meta/draes/draes_group_membership_data_skew.htm
```

### If OWD is private then who can acccess its records ?
```
Private : Only the record owner, and users above that role in the hierarchy, can view, edit, and report on those records.
```

### how to change the login access policy for 2  groups of users one will work in the day shift and the other will work in the night shift?
```
- create a custom profile for each group
- go to setup
- enter profiles in the quick find box
- click on profiles
- clone the standard user profile and create a new profile for each group
- change the login hours for each profile
- assign the profiles to the users
```
