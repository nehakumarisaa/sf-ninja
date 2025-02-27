### Connect One Salesforce to another Salesforce account
<https://github.com/therishabh/salesforce-apex>
```
public class SalesforceInregrationController {
    
    public string instance_url;
    
    public static void getAccessToken() {
    	String endpoint = 'https://dyninno-dev-ed.develop.my.salesforce.com/services/oauth2/token';
        String methodType = 'POST';
        String username = 'rishabhagrawal019@gmail.com';
        String password = 'Q!w2e3uaY9GY5VdmeBdnbkXeRHRnMc';
        String grantType = 'password';
        String clientId = '3MVG9pRzvMkjMb6k97lCSQehB7oWFZw5i.lrmuHTJASFIDNnnadire83dJD_Jjkasdfie393.Qh3jVxE756Ol';
        String clientSecretKey = '6EBB20442F8A7C503AEA73FE259319192AB1FD40DA8F4153A5JASDLKFEIR2348';
        
        // create a new http request
        HttpRequest httpReq = new HttpRequest();
        
        //set all fields into httpReq..
        httpReq.setEndpoint(endpoint);
        httpReq.setMethod(methodType);
        httpReq.setBody(
        	'username=' + username +
            '&password=' + password +
            '&grant_type=' + grantType + 
            '&client_id=' + clientId + 
            '&client_secret=' + clientSecretKey
        );
        
        Http http = new Http();
        HttpResponse httpResp = http.send(httpReq);
       	String jsonBody = httpResp.getBody();
        
        // deserilization
        SalesforceWrapper wrapData = (SalesforceWrapper)System.JSON.deserialize(jsonBody, SalesforceWrapper.class);
        
        system.debug('====> Accesss Token ====> '+ wrapData.access_token);
        system.debug('====> instance_url ====> '+ wrapData.instance_url);
        system.debug('===> response ===> ' + httpResp.getBody());
        getAccountData(wrapData.access_token);
        // createAccount(wrapData.access_token);
        
    }
    
    public Class SalesforceWrapper{
        public String access_token;
        public String instance_url;
        public SalesforceWrapper(String access_token, String instance_url){
            this.access_token = access_token;
            this.instance_url = instance_url;
        }
    }
    
    public static void getAccountData(String accessToken) {
        String url = 'https://dyninno-dev-ed.develop.my.salesforce.com/services/data/v60.0/query/?q=SELECT Id, Name FROM Account ORDER BY CreatedDate DESC LIMIT 5';
    	String methodType = 'GET';
        
        // create a new http request
        HttpRequest httpReq = new HttpRequest();
        httpReq.setEndpoint(url);
        httpReq.setMethod(methodType);
        httpReq.setHeader('Authorization', 'Bearer ' + accessToken);
        httpReq.setHeader('Content-Type', 'application/json');
        
        Http http = new Http();
        HttpResponse response = http.send(httpReq);
        system.debug('get Account Data ====> '+response.getBody());
        
    }
    
    public static void createAccount(String accessToken) {
        String endpoint = 'https://dyninno-dev-ed.develop.my.salesforce.com/services/data/v60.0/sobjects/Account';
    	String methodType = 'POST';
        
        String body = '{"Name" : "Account Shikha Salesforce"}';
        
        // create a new http request
        HttpRequest httpReq = new HttpRequest();
        httpReq.setEndpoint(endpoint);
        httpReq.setMethod(methodType);
        httpReq.setHeader('Authorization', 'Bearer ' + accessToken);
        httpReq.setHeader('Content-Type', 'application/json');
        
        httpReq.setBody(body);
        
        Http http = new Http();
        HttpResponse response = http.send(httpReq);
        system.debug('new Account Data ====> '+response.getBody());
        
    }
}
```