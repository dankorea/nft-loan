import { useEthers } from "@usedapp/core"
import helperConfig from "../helper-config.json"
import networkMapping from "../chain-info/deployments/map.json"
//import { constants } from "buffer"
import { constants } from "ethers"
import brownieConfig from "../brownie-config.json"
import dapp from "../dapp.png"
import loant from "../loant.png"
import snft from "../snft.png"
import { YourWallet } from "./yourWallet/YourWallet"

export type Token = {
    image: string
    address: string
    name: string
}

export const Main = () => {
    // show users operation interface: borrow eth, repay loans
    // show allowed NFTs from the wallet
    // get the address of staked NFT, loan token and dapp token
    // get the loan token balance of the users wallet
    const { chainId } = useEthers()
    const networkName = chainId ? helperConfig[chainId] : "dev"
    // console.log(chainId)
    // console.log(networkName)
    const dappTokenAddress = chainId ? networkMapping[String(chainId)]["DappToken"][0] : constants.AddressZero
    const simpleNftAddress = chainId ? networkMapping[String(chainId)]["SimpleNFT"][0] : constants.AddressZero
    const escrowAddress = chainId ? networkMapping[String(chainId)]["Escrow"][0] : constants.AddressZero
    const loanTokenAddress = chainId ? brownieConfig["networks"][networkName]["loan_token"] : constants.AddressZero
    // loanTokenAddress here in fact is the contract address

    const supportedTokens: Array<Token> = [
        {
            image: dapp,
            address: dappTokenAddress,
            name: "DAPP"
        },
        {
            image: loant,
            address: loanTokenAddress,
            name: "LOANT"

        },
        {
            image: snft,
            address: simpleNftAddress,
            name: "SNFT"
        }
    ]



    return (<YourWallet supportedTokens={supportedTokens}></YourWallet>)

}