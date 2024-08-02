import { Body, Button, Head, Html, Tailwind } from "@react-email/components";
import * as React from "react";
import { SendMail } from "../../types";

export default function Email(props: SendMail) {
  const { uuid } = props 
 
  return (
    <Html>
      <Head>
        <title>Welcome to doublequotes!</title>
      </Head>
      <Body>
        <Tailwind>
          <div>
            <b>Make your very own community!</b>
          </div>
          <div>
            <a href={`http://localhost:5173/verify-email?token=${uuid}`}>Verify Email</a>
          </div>
        </Tailwind>
      </Body>
    </Html>
  );
}
