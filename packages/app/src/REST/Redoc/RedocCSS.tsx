const onePixelBorder = "1px solid rgba(0, 0, 0, 0.12)";

/** These are manual style overrides for Redoc */
export const RedocCSS = css({
  // Vertically align the items in the left menu
  "& ul > li > label": {
    alignItems: "center !important",
  },

  ".redoc-wrap": {
    width: "100% !important",
  },

  ".api-content": {
    width: "100% !important",
  },

  ".api-content > div > div > div + div": {
    borderRadius: "16px !important",
    padding: "2rem !important",
    height: "fit-content !important",
    backgroundColor: "#3f3f46 !important",
    // maxWidth: "600px !important"
  },

  ".react-tabs__tab-panel": {
    borderRadius: "16px !important",
  },

  // Keep the "Authorization" open/close chevrons on the same line as the text
  "& h5 + svg": {
    display: "inline",
  },

  // Keep request body open/close chevrons on the same line as their text
  "& table tbody tr button > svg": {
    display: "inline",
  },

  "& .menu-content": {
    cursor: "pointer",
    paddingTop: "8px",
    borderRight: onePixelBorder,
    "& a:last-of-type": {
      borderRight: onePixelBorder,
    },
  },

  // Correction for the hacky way Redoc tries to show a hierarchy line
  "& table tbody tr": {
    "&:first-of-type:not(.last) > td:first-of-type": {
      backgroundImage:
        "linear-gradient(to bottom, transparent 0%, transparent 1.38rem, rgb(124, 124, 187, 255) 1.32rem, rgb(124, 124, 187, 255) 100%)",
    },
    "&.last:first-of-type > td:first-of-type": {
      background: "none",
    },
    "&.last > td:first-of-type": {
      backgroundImage:
        "linear-gradient(to bottom, rgb(124, 124, 187, 255) 0%, rgb(124, 124, 187, 255) 1.38rem, transparent 1.32rem, transparent 100%);",
    },
  },

  "& .scrollbar-container > div > a": {
    display: "none",
  },

  // // Inline code blocks in request body parameters (most common)
  // "& p > code": {
  //   color:
  //     theme.palette.mode === "dark"
  //       ? theme.palette.error.light
  //       : theme.palette.error.dark,
  //   border: onePixelBorder,
  //   padding: "2px 4px 2px 4px !important",
  // },
  //
  // // Inline code blocks in spans
  // "& span > code": {
  //   color:
  //     theme.palette.mode === "dark"
  //       ? theme.palette.error.light
  //       : theme.palette.error.dark,
  //   border: onePixelBorder,
  // },
  //
  // // Inline code blocks in a list
  // "& li > code": {
  //   color:
  //     theme.palette.mode === "dark"
  //       ? theme.palette.error.light
  //       : theme.palette.error.dark,
  //   border: onePixelBorder,
  //   padding: "2px 4px 2px 4px !important",
  // },
  //
  // // Request samples buttons
  // "& ul.react-tabs__tab-list": {
  //   marginBottom: theme.spacing(1),
  //   // Unselected tabs
  //   "& li": {
  //     backgroundColor:
  //       theme.palette.mode === "dark"
  //         ? MUI.lighten("#000000", 0.25)
  //         : MUI.lighten("#000000", 0.7),
  //
  //     color:
  //       theme.palette.mode === "dark"
  //         ? theme.palette.text.secondary + " !important"
  //         : theme.palette.primary.contrastText + " !important",
  //
  //     border: `2px solid transparent`,
  //     transitionProperty: "all",
  //     transitionDuration: "400ms",
  //     transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  //
  //     "&:hover": {
  //       backgroundColor: MUI.lighten(
  //         theme.palette.mode === "dark"
  //           ? MUI.lighten("#000", 0.3)
  //           : MUI.darken("#FFF", 0.5),
  //         0.1
  //       ),
  //     },
  //
  //     // Selected tab
  //     "&.react-tabs__tab--selected": {
  //       "&:focus": {
  //         outline: `unset`,
  //       },
  //
  //       border: `2px solid ${
  //         theme.palette.mode === "dark"
  //           ? theme.palette.primary.dark
  //           : theme.palette.primary.main
  //       }`,
  //
  //       "&.tab-success": {
  //         border: `2px solid ${
  //           theme.palette.mode === "dark"
  //             ? theme.palette.success.dark
  //             : theme.palette.success.main
  //         }`,
  //       },
  //       "&.tab-error": {
  //         border: `2px solid ${theme.palette.error.main}`,
  //       },
  //
  //       backgroundColor:
  //         theme.palette.mode === "dark"
  //           ? theme.palette.background.default
  //           : MUI.lighten("#000000", 0.2),
  //
  //       "&:hover": {
  //         backgroundColor: MUI.lighten(
  //           theme.palette.mode === "dark"
  //             ? theme.palette.background.default
  //             : MUI.darken("#FFF", 0.75),
  //           0.05
  //         ),
  //       },
  //
  //       color: "white !important",
  //       boxShadow: theme.shadows[15],
  //     },
  //   },
  // },
  //
  // // Request samples panels
  // "& .react-tabs__tab-panel": {
  //   borderRadius: "2px",
  //
  //   // Make nested drop-downs readable in light/dark mode
  //   "& > div > div": {
  //     "& > div > span + div": {
  //       backgroundColor:
  //         theme.palette.mode === "dark"
  //           ? theme.palette.background.paper
  //           : MUI.lighten("#000000", 0.3),
  //     },
  //     "& > span + div": {
  //       borderRadius: "2px",
  //       backgroundColor:
  //         theme.palette.mode === "dark"
  //           ? theme.palette.background.paper
  //           : MUI.lighten("#000000", 0.3),
  //       "&:hover": {},
  //     },
  //   },
  // },
  //
  // "& .api-content": {
  //   "& button": {
  //     borderRadius: "2px",
  //   },
  //
  //   "& h5": {
  //     color:
  //       theme.palette.mode === "light"
  //         ? theme.palette.grey["A700"]
  //         : theme.palette.grey[300],
  //     borderBottom: onePixelBorder,
  //     fontSize: "0.95rem",
  //     "& > span": {
  //       color:
  //         theme.palette.mode === "light"
  //           ? theme.palette.grey[600]
  //           : theme.palette.grey[300],
  //     },
  //   },
  //
  //   // Replace hard-coded bottom-border on tables under .api-content on md and up
  //   [theme.breakpoints.up("md")]: {
  //     "& table tbody tr td:last-of-type": {
  //       borderBottom: onePixelBorder,
  //     },
  //   },
  //
  //   "& h3": {
  //     // Fixes 'Response samples' in light mode
  //     color: theme.palette.text.primary,
  //   },
  //
  //   // Mobile specific styles
  //   [theme.breakpoints.only("xs")]: {
  //     // Temporary workaround for the "x <= height * width <= y" text not wrapping correctly
  //     "& table tbody tr td ul": {
  //       paddingLeft: "0em",
  //       listStyleType: "none",
  //       "& li > span": {
  //         flexWrap: "wrap",
  //         gap: theme.spacing(0.5),
  //         fontSize: "0.8rem",
  //       },
  //       "& li > code": {
  //         fontSize: "0.8rem",
  //       },
  //     },
  //     // Same as above but inside of error under 'Responses'
  //     "& button ul > li > ul ": {
  //       paddingLeft: "0em",
  //       listStyleType: "none",
  //       "& > li > span": {
  //         flexWrap: "wrap",
  //         gap: theme.spacing(0.5),
  //         fontSize: "0.8rem",
  //       },
  //     },
  //
  //     // Fixes tables in request bodies clipping off the page on small screens
  //     "& table ": {
  //       display: "flex",
  //       "& > tbody": {
  //         width: "100%",
  //         "& > tr": {
  //           display: "flex",
  //           flexDirection: "column",
  //           "& > td": {
  //             paddingBottom: "8px",
  //             width: "100%",
  //           },
  //         },
  //       },
  //     },
  //   },
  //
  //   "& table tbody": {
  //     // Requirement pills (e.g. >= 128)
  //     "& div > span > span": {
  //       color:
  //         theme.palette.mode === "dark"
  //           ? theme.palette?.primary?.light
  //           : theme.palette?.primary?.main,
  //       backgroundColor: theme.palette.background.paper,
  //     },
  //
  //     // FF workaround to at least improve the drop-down text color (until they support :has operator below)
  //     "& label": {
  //       color:
  //         theme.palette.mode === "dark"
  //           ? theme.palette.grey[600]
  //           : theme.palette.grey[900],
  //     },
  //
  //     // Discriminator drop-down
  //     "& div:has(> select)": {
  //       marginTop: theme.spacing(1),
  //       minWidth: "12rem",
  //       "& > svg": {
  //         color: theme.palette.text.primary,
  //       },
  //       "& > label": {
  //         color: theme.palette.text.primary,
  //       },
  //       backgroundColor: theme.palette.background.paper + " !important",
  //       border: onePixelBorder,
  //     },
  //   },
  //
  //   // Links
  //   "& a": {
  //     color:
  //       theme.palette.mode === "dark"
  //         ? theme.palette?.primary?.light
  //         : theme.palette?.primary?.main,
  //     fontWeight: 500,
  //     textDecoration: "none",
  //     "&:hover": {
  //       color:
  //         theme.palette.mode === "dark"
  //           ? theme.palette?.primary?.light
  //           : theme.palette?.primary?.main,
  //       textDecoration: "underline",
  //     },
  //     "&:visited": {
  //       color:
  //         theme.palette.mode === "dark"
  //           ? theme.palette?.primary?.light
  //           : theme.palette?.primary?.main,
  //     },
  //   },
  // },
});
