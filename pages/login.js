import React from "react";
import { useSession, signIn, signOut, getSession } from "next-auth/react";

export default function login() {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className="container login-container">
        <div className="row row-login">
          <div className="login">
            <p>You are not login</p>
            <div
              className="
            button"
            >
              <button onClick={() => signIn()}>Sign in</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/",
      },
    };
  } else {
    return {
      props: {},
    };
  }
};
