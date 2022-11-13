import { useEthers, useEtherBalance } from "@usedapp/core"
import { Button } from "@mui/material"

//import Box from '@mui/material/Box';
//import Container from '@mui/material/Container';


// const useStyles = makeStyles(() => ({
//     container: {
//         padding: theme.spacing(4),
//         display: "flex",
//         justifyContent: "flex-end",
//         gap: theme.spacing(1)
//     }
// }))

export const Header = () => {
    // const classes = useStyles

    const { account, activateBrowserWallet, deactivate } = useEthers()

    const isConnected = account !== undefined

    return (
        // <div className={classes.Container}>
        <div>
            {isConnected ? (
                <Button color="primary"
                    onClick={deactivate} variant="contained">
                    Disconnect
                </Button>
            ) : (
                <Button color="primary"
                    onClick={() => activateBrowserWallet()} variant="contained">
                    Connect
                </Button>

            )}
            <br />
        </div>
        // </div>
    )
}


