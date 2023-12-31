import { AppProps } from "$fresh/server.ts";
import { asset } from "$fresh/runtime.ts";

export default function App(props: AppProps) {
  const { Component } = props;

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/ico" href={asset("/images/favicon.ico")} />
        <link rel="stylesheet" href={asset("/styles/tailwind.css")} />
        <title>Deno Chatter - Chat online, free and anonymously</title>
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
