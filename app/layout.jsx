import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import { ThemeModeScript } from "flowbite-react";
import { Suspense } from "react";

export const metadata = {
  title: "MiniStories",
  description: "Discover & Share Your Stories",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>{/* <ThemeModeScript /> */}</head>
      <body>
        <Provider>
          <main className="app">
            <Nav />
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
