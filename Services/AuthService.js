global.fetch = require('node-fetch');

global.navigator = () => null;

const AmazonCognitoIdentity = require ('amazon-cognito-identity-js'); // defining a CognitoUserPool
const poolData = {
    UserPoolId: "{us-east-1_LQnhvIzuv}",
    ClientId: "{69dpl8pvvtaeqhulukouortu6p}"
};
const pool_region = "{us-east-1}";

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

exports.Register = function (body, callback) {
    var name = body.name;
    var email = body.email;
    var password = body.password;
    var attributeList = [];

    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name: "email", Value:email})); // since email is requested, this is attached as a Cognito user attribute

    //sign up method to create the user
    userPool.signUp(name, password, attributeList, null, function(err, result){
        if(err)
            callback(err);
        
        var cognitoUser = result.user;
        callback(null, cognitoUser);
    })
}