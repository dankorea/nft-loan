
import { Token } from "../Main"
import { useEthers, useTokenBalance } from "@usedapp/core"
import { formatUnits } from "ethers/lib/utils"
import { BalanceMsg } from "../../components/BalanceMsg"
export interface WalletBalanceProps {
    token: Token
}

export const WalletBalance = ({ token }: WalletBalanceProps) => {
    const { image, address, name } = token
    const { account } = useEthers()
    const tokenBalance = useTokenBalance(address, account)
    const formattedTokenBalance: number = tokenBalance ? parseFloat(formatUnits(tokenBalance)) : 0
    console.log(tokenBalance?.toString())
    // return (<div>Balance is : {formattedTokenBalance}</div>)
    return (
        <BalanceMsg
            label={'Your un-staked ${name} balance'}
            tokenImgSrc={image}
            amount={formattedTokenBalance}
        />)

}