### Active Cron Jobs
```
select CronExpression, CronJobDetail.Id, CronJobDetail.Name, StartTime, EndTime, NextFireTime, PreviousFireTime, State, TimesTriggered, CronJobDetail.JobType 
from CronTrigger 
where State != 'DELETED' and state != 'COMPLETE'
```

### Apex Batch / Scheduled Jobs - Completed 
```
Select ApexClass.Name, CronTrigger.CreatedBy.Name, CronTrigger.PreviousFireTime, CronTrigger.StartTime, CronTrigger.EndTime 
from AsyncApexJob 
where JobType In ('BatchApex','ScheduledApex') and Status IN ('Completed') order by CreatedDate
```

### Apex Batch / Scheduled Jobs - In Progress 
```
Select ApexClass.Name, CronTrigger.CreatedBy.Name, CronTrigger.PreviousFireTime, CronTrigger.StartTime, CronTrigger.EndTime 
from AsyncApexJob 
where JobType In ('BatchApexWorker','BatchApex','ScheduledApex') and Status IN ('Queued','Processing','Holding','Preparing') order by status ASC, CronTrigger.NextFireTime ASC
```

###  Debug Logs
```
Select Id, Starttime, LogUserId, LogLength, Location 
from ApexLog
```

### Test Class Coverage
```
Select Id, ApexClassOrTrigger.Name, NumLinesCovered, NumLinesUncovered from ApexCodeCoverageAggregate
```