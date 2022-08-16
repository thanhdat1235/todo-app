import "../styles/globals.css";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import store from "../redux/store";
import "../public/scss/todo.scss";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps, session }) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
