import { Provider } from "react-redux";
import { store } from "@/app/store";
import "@/styles/globals.css";
import UserPersist from "@/components/shared/persistent/UserPersist";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <UserPersist>
        <Component {...pageProps} />
        <Toaster />
      </UserPersist>
    </Provider>
  );
}
