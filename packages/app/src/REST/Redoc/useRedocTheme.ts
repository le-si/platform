import * as Redoc from "redoc";
import { PartialDeep } from "type-fest";

export type RedocTheme = PartialDeep<Redoc.ResolvedThemeInterface>;

export function useRedocTheme(): RedocTheme {
  return {
    sidebar: {
      backgroundColor: "transparent",
      padding: "0",
    },
    typography: {
      fontFamily: "Inter, sans-serif",
      fontSize: "15px",
      headings: {
        fontFamily: "Inter, sans-serif",
      },
      smoothing: "antialiased",
    },
    //   spacing: {
    //     sectionVertical: 40,
    //     sectionHorizontal: isTinyDevice ? 16 : 40,
    //   },
    //   breakpoints: {
    //     small: `${theme.breakpoints.values.md}px`,
    //     medium: `1900px`,
    //   },
    //   colors: {
    //     tonalOffset: 0,
    //
    //     primary: {
    //       main: theme.palette.primary.main,
    //       dark: theme.palette.primary.dark,
    //       light: theme.palette.primary.light,
    //       contrastText: theme.palette.primary.contrastText,
    //     },
    //
    //     border: {
    //       light: theme.palette.divider,
    //       dark: theme.palette.divider,
    //     },
    //
    //     text: {
    //       primary: isDarkMode
    //         ? theme.palette.text.primary
    //         : MUI.darken(theme.palette.text.primary, 0.6),
    //       secondary: theme.palette.text.secondary,
    //     },
    //
    //     success: {
    //       main: isDarkMode
    //         ? theme.palette.success.main
    //         : theme.palette.success.dark,
    //     },
    //     warning: {
    //       main: isDarkMode
    //         ? theme.palette.warning.main
    //         : theme.palette.warning.dark,
    //     },
    //     error: {
    //       main: isDarkMode
    //         ? theme.palette.error.light
    //         : theme.palette.error.main,
    //     },
    //     gray: {
    //       50: theme.palette.grey[200],
    //       100: theme.palette.grey[400],
    //     },
    //   },
    //
    //   sidebar: {
    //     backgroundColor: isDarkMode
    //       ? MUI.darken(theme.palette.background.default, 0.2)
    //       : theme.palette.grey["100"],
    //     activeTextColor: theme.palette.text.secondary,
    //     textColor: theme.palette.text.primary,
    //     groupItems: {
    //       activeBackgroundColor: theme.palette.background.paper,
    //       activeTextColor: theme.palette.text.primary,
    //     },
    //     level1Items: {
    //       activeBackgroundColor: theme.palette.background.paper,
    //       activeTextColor: theme.palette.text.primary,
    //     },
    //   },
    //
    //   schema: {
    //     defaultDetailsWidth: "60%",
    //     typeNameColor: theme.palette.text.disabled,
    //     typeTitleColor: grey,
    //     requireLabelColor: theme.palette.error.main,
    //     labelsTextSize: "0.80rem",
    //     linesColor: theme.palette.divider,
    //     nestedBackground: theme.palette.background.paper,
    //   },
    //
    //   rightPanel: {
    //     backgroundColor: theme.palette.background.paper,
    //     servers: {
    //       overlay: {
    //         textColor: theme.palette.text.secondary,
    //         backgroundColor: theme.palette.background.default,
    //       },
    //       url: {
    //         backgroundColor: theme.palette.background.paper,
    //       },
    //     },
    //   },
    //   codeBlock: {
    //     backgroundColor: isDarkMode
    //       ? MUI.lighten("#000000", 0.1)
    //       : MUI.lighten("#000000", 0.2),
    //   },
    //   typography: {
    //     fontFamily: font.fontFamily,
    //     fontSize: `${font.fontSize / 13}rem`,
    //     optimizeSpeed: true,
    //     smoothing: "antialiased",
    //     headings: {
    //       fontFamily: font.fontFamily,
    //       fontWeight: "900",
    //     },
    //
    //     code: {
    //       backgroundColor: theme.palette.background.paper,
    //       fontSize: "0.9rem",
    //       color: theme.palette.text.primary,
    //       lineHeight: "1.5rem",
    //     },
    //
    //     links: {
    //       // This is done using an SX block in <REST.Page /> so that
    //       // we can reuse the same link styles as the rest of the app.
    //     },
    //   },
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
}
