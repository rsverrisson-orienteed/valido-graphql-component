import type { NextPage } from "next";
import { useState } from "react";
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
} from 'amazon-cognito-identity-js';
import { CognitoIdentityProviderClient }
  from "@aws-sdk/client-cognito-identity-provider";

import { SignUp } from "../components/signUp";
import { SignIn } from "../components/signIn";
import { QueryManager } from "../components/graphql"

const REGION = "eu-west-1";
const API_URL = "https://w4sytz4zxvgvzl55a3dxfzuy6q.appsync-api.eu-west-1.amazonaws.com/graphql";
const CLIENT_ID = "244sipmboku8bchckm9ecgrdf9";
const USER_POOL_ID = "eu-west-1_cxsB3xqVl";


const client = new CognitoIdentityProviderClient({ region: REGION });


const Home: NextPage = () => {
  const [token, setToken] = useState("");

  return (
    <>
      {!token &&
        <>
          <SignUp client={client} clientId={CLIENT_ID} />
          <SignIn setToken={setToken} clientId={CLIENT_ID} userPoolId={USER_POOL_ID} />
        </>
      }
      {token &&
        <QueryManager token={token} apiUrl={API_URL}/>
      }
    </>
  );
};

export default Home;
