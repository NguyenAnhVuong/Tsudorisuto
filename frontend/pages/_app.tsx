import { store } from "@/app/store";
import AuthContainer from "@/components/AuthContainer";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Quicksand } from "next/font/google";
import { ConfigProvider } from "antd";

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("accessToken");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const quicksand = Quicksand({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <AuthContainer>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#5cb85c",
              },
            }}
          >
            <main className={quicksand.className + " dark:bg-dark h-full"}>
              <Component {...pageProps} />
            </main>
          </ConfigProvider>
        </AuthContainer>
      </Provider>
    </ApolloProvider>
  );
}
