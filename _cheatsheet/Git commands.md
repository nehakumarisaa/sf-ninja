### Cleanup Unnecessary files and optimize the local repo
```
git gc --prune=now
```

### List file differences between destination and source feature branches
```
git diff --name-status main feature/branch > change.txt

M = modified
A = added
D = deleted
R = renamed
C = copied
U = updated but unmerged
```

### Pull
```
git pull origin feature/branch
```