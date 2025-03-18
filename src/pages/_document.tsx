import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html data-mantine-color-scheme="light" lang="en">
      <Head />
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
