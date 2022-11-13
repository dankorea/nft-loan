import { useContractFunction, useEthers } from "@usedapp/core"
import { constants, utils } from "ethers"
import Escrow from "../chain-info/contracts/Escrow.json"
import ERC721 from "../chain-info/contracts/SimpleNFT.json"
import networkMapping from "../chain-info/deployments/map.json"
import { Contract } from "@ethersproject/contracts"
export const useStakeTokens = (tokenAddress: string) => {
    // approve: address, abi, chainId,
    const { chainId } = useEthers()
    const { abi } = Escrow
    const escrowAddress = chainId ? networkMapping[String(chainId)]["Escrow"][0] : constants.AddressZero
    const escrowInterface = new utils.Interface(abi)
    const escrowContract = new Contract(escrowAddress, escrowInterface)

    const erc721ABI = ERC721.abi
    const erc721Interface = new utils.Interface(erc721ABI)
    const erc721Contract = new Contract(tokenAddress, erc721Interface)
    // stake nfts
    const { send: approveErc721Send, state: approveErc721State } = useContractFunction(erc721Contract, "approve", { transactionName: "Approve ERC721 transfer" })
    const approve = (index: string) => {
        return approveErc721Send(escrowAddress, index)
    }
    return { approve, approveErc721State }
}   