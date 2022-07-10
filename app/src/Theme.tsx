import {createTheme} from "@mui/material/styles";
// export const themeOptions: ThemeOptions = {
//   palette: {
//     type: 'dark',
//     primary: {
//       main: '#11998e',
//     },
//     secondary: {
//       main: '#38ef7d',
//     },
//     background: {
//       default: '#1b2430',
//       paper: '#1b2430',
//     },
//   },
//   typography: {
//     fontFamily: 'Lato',
//   },
// };

export const theme=createTheme({
    palette: {
    primary: {
      main: '#11998e',
    },
    secondary: {
      main: '#38ef7d',
    },
    background: {
      default: '#1b2430',
      // paper: '#1b2430',
    },
  text:{
    primary:"#d0ece1",
    secondary:"#11998e",
    disabled:"#11998e",
  },
  action:{
    active:"#11998e",
    selected:"#11998e",
    focus:"#11998e",
    hover:"#11998e"
  }
  },
  typography: {
    // fontFamily: 'Lato',
    fontSize:16,
  },

});