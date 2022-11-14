import React from "react"
import { Token } from "../Main"
import { useEthers, useTokenBalance } from "@usedapp/core"
import { formatUnits } from "ethers/lib/utils"
import Button from '@mui/material/Button'
import Input from '@mui/material/Input'
import { useState } from "react"
import { useStakeTokens } from "../../hooks/useStakeTokens"

export interface StakeFormProps {
    token: Token
}

export const StakeForm = ({ token }: StakeFormProps) => {
    const { address: tokenAddress, name } = token
    const { account } = useEthers()
    const tokenBalance = useTokenBalance(tokenAddress, account)
    const formattedTokenBalance: number = tokenBalance ? parseFloat(formatUnits(tokenBalance, 18)) : 0

    const [amount, setAmount] = useState<number | string | Array<number | string>>(0)
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newAmount = event.target.value === "" ? "" : Number(event.target.value)
        setAmount(newAmount)
        console.log(newAmount)
    }

    const { approveAndStake, approveErc721State } = useStakeTokens(tokenAddress)

    const handleStakeSubmit = () => {
        // const amountAsWei = utils.parseEther(amount.toString())
        const index = amount.toString()
        return approveAndStake(index)
    }
    return (
        <>
            <Input onChange={handleInputChange} />
            <Button
                onClick={handleStakeSubmit}
                color="primary"
                size="large">
                Stake!!
            </Button>
        </>
    )


}