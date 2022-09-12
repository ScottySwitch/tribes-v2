import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <title>
        Tribes: Get travel information and recommendation for what to eat, buy,
        things to do, where to stay and how to get there
      </title>
      <Head>
        <meta
          name="google-site-verification"
          content="2VDEkCpliYr8FkS2an1M0kvjTAL3iRJSiBedyiBTrLs"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;700&display=swap"
          rel="stylesheet"
        />
        <meta
          name="description"
          content="Tribes: Get travel information and recommendation for what to eat, buy, things to do, where to stay and how to get there"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
