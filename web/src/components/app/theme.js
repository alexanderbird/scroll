import { createTheme } from "@mui/material/styles";
import * as manifest from '../../manifest.json';

export const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: manifest.theme_color,
    },
    secondary: {
      main: '#98d7c2',
    },
  },
});
