import "@/styles/globals.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";

import type { AppProps } from "next/app";
import {
  createTheme,
  MantineProvider,
  MantineColorsTuple,
} from "@mantine/core";

import { DM_Sans } from "next/font/google";
import { Notifications } from "@mantine/notifications";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-dm-sans",
});

const base: MantineColorsTuple = [
  "#fbefef",
  "#efdcdc",
  "#e2b4b4",
  "#d68a8a",
  "#cc6667",
  "#c65050",
  "#c44544",
  "#ad3736",
  "#9b2f2f",
  "#541718",
];

const theme = createTheme({
  colors: {
    primary: base,
  },
  primaryColor: "primary",
  primaryShade: { light: 9, dark: 9 },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <Notifications />
      <main className={dmSans.className}>
        <Component {...pageProps} />
      </main>
    </MantineProvider>
  );
}