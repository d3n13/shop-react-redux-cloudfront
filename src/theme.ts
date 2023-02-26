import { createTheme, ThemeOptions } from "@mui/material/styles";

const themeOptions: ThemeOptions = {
  palette: {
    background: {
      default: "pink",
      paper: 'yellow'
    },
  },
};

export const theme = createTheme(themeOptions);
