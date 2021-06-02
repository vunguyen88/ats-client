import { createMuiTheme, colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

const theme = createMuiTheme({
    palette: {
        background: {
        dark: '#F4F6F8',
        default: colors.common.white,
        paper: colors.common.white
        },
        primary: {
        main: colors.cyan[400]
        },
        secondary: {
        main: colors.red[500]
        },
        text: {
        primary: colors.grey[900],
        secondary: colors.blueGrey[600]
        },
    },
    paper: {
        background: 'blue'
    },
    shadows,
    typography
});

export default theme;
