package jsoncreator;

import entity.User;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;

/**
 *
 * @author user
 */
public class UserJsonBuilder {
    public JsonObject createJsonObject(User user){
        CustomerJsonBuilder cjb = new CustomerJsonBuilder();
        
        JsonObjectBuilder job = Json.createObjectBuilder();
          job.add("id",user.getId())
            .add("login",user.getLogin())
            .add("customer",cjb.createJsonObject(user.getCustomer()));
            
        return job.build();
                    
    }
}