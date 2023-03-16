import { AppProps } from "next/app";
import { Provider } from "react-redux";
import * as React from "react";
import { CssBaseline } from "@mui/material";
import store from "../store/store";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { green, red } from "@mui/material/colors";

function ThemeWrapper(props: { children: React.ReactNode }) {
  const { children } = props;

  // colors
  const primary = "#1976D2";
  const secondary = "#9C27B0";
  const black = "#343a40";
  const darkBlack = "rgb(36, 40, 44)";
  const background = "#f5f5f5";
  const warningLight = "rgba(253, 200, 69, .3)";
  const warningMain = "rgba(253, 200, 69, .5)";
  const warningDark = "rgba(253, 200, 69, .7)";

  // breakpoints
  const xl = 1920;
  const lg = 1280;
  const md = 960;
  const sm = 600;
  const xs = 0;

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: "light",
          primary: {
            light: "#69696a",
            main: "#28282a",
            dark: "#1e1e1f"
          },
          secondary: {
            light: "#fff5f8",
            main: "#ff3366",
            dark: "#e62958"
          },
          warning: {
            main: "#ffc071",
            dark: "#ffb25e"
          },
          error: {
            light: red[50],
            main: red[500],
            dark: red[700]
          },
          success: {
            light: green[50],
            main: green[500],
            dark: green[700]
          },
          tonalOffset: 0.2,
          background: {
            default: background
          }
        },
        breakpoints: {
          values: {
            xl,
            lg,
            md,
            sm,
            xs
          }
        },
        typography: {
          fontFamily: "-apple-system, DengXian, Ubuntu, sans-serif",
          fontSize: 14,
          fontWeightLight: 300, // Work Sans
          fontWeightRegular: 400, // Work Sans
          fontWeightMedium: 700 // Roboto Condensed
        }
      }),
    []
  );

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeWrapper>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeWrapper>
    </Provider>
  );
}