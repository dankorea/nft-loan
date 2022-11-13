interface BalanceMsgProps {
    label: string
    tokenImgSrc: string
    amount: number
}

export const BalanceMsg = ({ label, tokenImgSrc, amount }: BalanceMsgProps) => {
    return (
        <div>
            <div>{label}</div>
            <div>{amount}</div>
            <img src={tokenImgSrc} alt="token logo" />
        </div>
    )
}
