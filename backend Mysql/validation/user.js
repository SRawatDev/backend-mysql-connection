const Validator = require("validatorjs");
class userValidation
{
    Signupvalidation=(body)=>
    {
        const rules={
            name:'required',
            email:'required|email',
            phoneNo:'required|min:8|max:15',
            password:'required'
        }
        const validation=new Validator(body,rules)
        return validation
    }
    loginvalidation=(body)=>{
        const rules={
            email:'required|email',
            password:'required'
        }
        const validation=new Validator(body,rules)
        return validation

    }
}
module.exports=new userValidation()