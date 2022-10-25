import { useState } from "react";
import { SignUpCommand } 
  from "@aws-sdk/client-cognito-identity-provider";

const SignUp = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = async () => {
    console.log("Handling click");
    console.log("Username", username);
    console.log("Password", password);

    const input = {
      ClientId: props.clientId,
      Password: password,
      Username: username
    };
    console.log("Sending request to Cognito...");
    const signUpCommand = new SignUpCommand(input);
    const resp = await props.client.send(signUpCommand);
    console.log(resp);
  }

  return (
    <>
      <h2>Sign Up</h2>

      <label htmlFor="username">Username</label>
      <input type="text" onChange={e => setUsername(e.target.value)} value={username} name="Username" id="username"/>

      <label htmlFor="password">Username</label>
      <input type="text" onChange={e => setPassword(e.target.value)} value={password} name="Password" id="password"/>

      <button onClick={handleClick}>Submit</button>
    </>
  );
};

export default SignUp;
