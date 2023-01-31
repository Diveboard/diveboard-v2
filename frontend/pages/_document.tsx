import React from 'react';
import Document, {
  DocumentInitialProps, Head, Html, Main, NextScript,
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render(): JSX.Element {
    return (
      <Html>
        <Head lang="en">
          <title>DiveBoard</title>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans&family=Permanent+Marker&family=Prompt:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet"
          />

          <meta name="application-name" content="Diveboard" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="Diveboard" />
          <meta name="description" content="Diveboard" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta
            name="msapplication-config"
            content="/icons/browserconfig.xml"
          />
          <meta name="msapplication-TileColor" content="#2B5797" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#000000" />

          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" type="image/svg" sizes="32x32" href="/diveboard-logo32x32.svg" />
          <link rel="apple-touch-icon" sizes="192x192" href="/diveboard-logo192x192.png" />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content="https://diveboard-org.web.app" />
          <meta name="twitter:title" content="Diveboard" />
          <meta
            name="twitter:description"
            content="Diveboard"
          />
          <meta
            name="twitter:image"
            content="/diveboard-logo144x144.svg"
          />
          <meta name="twitter:creator" content="@DavidWShadow" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Diveboard" />
          <meta property="og:description" content="Diveboard" />
          <meta property="og:site_name" content="Diveboard" />
          <meta property="og:url" content="https://diveboard-org.web.app" />
          <meta
            property="og:image"
            content="/diveboard-logo144x144.svg"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
