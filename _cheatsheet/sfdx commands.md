### Generate package.xml
```
sf project generate manifest --from-org [[org alias]]
Example - sf project generate manifest --from-org dev
```

### Retrieve files from SF Org using package.xml
```
sf project retrieve start -x manifest/package.xml
```