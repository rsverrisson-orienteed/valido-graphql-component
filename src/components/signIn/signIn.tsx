import { useState } from "react";
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails
} from 'amazon-cognito-identity-js';

const SignIn = (props: any) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = async () => {
    console.log("Signing user in...");
    let authenticationData = {
      Username: username,
      Password: password,
    };
    let authenticationDetails = new AuthenticationDetails(
      authenticationData
    );
    let poolData = {
      UserPoolId: props.userPoolId, // Your user pool id here
      ClientId: props.clientId, // Your client id here
    };
    let userPool = new CognitoUserPool(poolData);
    let userData = {
      Username: username,
      Pool: userPool,
    };
    let cognitoUser = new CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function(result) {
        console.log("Cognito resp", result);
        props.setToken(result.getIdToken().getJwtToken());
      },
      onFailure: function(err) {
        alert(err.message || JSON.stringify(err));
      },
    });
  }


  return (
    <>
      <h2>SignIn</h2>

      <label htmlFor="signin-username">Username</label>
      <input type="text" onChange={e => setUsername(e.target.value)} value={username} name="Username" id="signin-username" />

      <label htmlFor="signin-password">Username</label>
      <input type="text" onChange={e => setPassword(e.target.value)} value={password} name="Password" id="signin-password" />

      <button onClick={handleClick}>Submit</button>
    </>
  )
}

export default SignIn;
