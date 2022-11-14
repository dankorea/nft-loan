"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEthers = void 0;
const utils_1 = require("ethers/lib/utils");
const connectors_1 = require("../providers/network/connectors");
const hooks_1 = require("../hooks");
const useReadonlyProvider_1 = require("./useReadonlyProvider");
const react_1 = require("react");
const context_1 = require("../providers/network/readonlyNetworks/context");
/**
 * Returns connection state and functions that allow to manipulate the state.
 * **Requires**: `<ConfigProvider>`
 *
 * @public
 * @returns {} Object with the following:
    - `account: string` - current user account (or *undefined* if not connected)
    - `chainId: ChainId` - current chainId (or *undefined* if not connected)
    - `library: Web3Provider` - an instance of ethers [Web3Provider](https://github.com/TrueFiEng/useDApp/tree/master/packages/example) (or `undefined` if not connected)
    - `active: boolean` - returns if provider is connected (read or write mode)
    - `activateBrowserWallet()` - function that will initiate connection to browser web3 extension (e.g. Metamask)
    - `async activate(connector: AbstractConnector, onError?: (error: Error) => void, throwErrors?: boolean)` - function that allows to connect to a wallet
    - `async deactivate()` - function that disconnects wallet
    - `error?: Error` - an error that occurred during connecting (e.g. connection is broken, unsupported network)
 */
function useEthers() {
    var _a;
    const { connector, deactivate, activate, activateBrowserWallet, isLoading } = (0, connectors_1.useConnector)();
    const readonlyNetwork = (0, useReadonlyProvider_1.useReadonlyNetwork)();
    const [errors, setErrors] = (0, react_1.useState)((_a = connector === null || connector === void 0 ? void 0 : connector.errors) !== null && _a !== void 0 ? _a : []);
    const [account, setAccount] = (0, react_1.useState)(getAccount(connector));
    const [provider, setProvider] = (0, react_1.useState)(connector === null || connector === void 0 ? void 0 : connector.getProvider());
    const [chainId, setChainId] = (0, react_1.useState)(connector === null || connector === void 0 ? void 0 : connector.chainId);
    (0, react_1.useEffect)(() => {
        if (!(connector === null || connector === void 0 ? void 0 : connector.getProvider())) {
            setAccount(undefined);
            setProvider(readonlyNetwork === null || readonlyNetwork === void 0 ? void 0 : readonlyNetwork.provider);
            setChainId(readonlyNetwork === null || readonlyNetwork === void 0 ? void 0 : readonlyNetwork.chainId);
            setErrors([]);
            return;
        }
        setChainId(connector.chainId);
        setErrors(connector.errors);
        setProvider(connector.getProvider());
        setAccount(getAccount(connector));
        return connector.updated.on(({ chainId, errors, accounts }) => {
            setChainId(chainId);
            setErrors(errors);
            if (accounts[0]) {
                setAccount((0, utils_1.getAddress)(accounts[0]));
            }
            else {
                setAccount(undefined);
            }
        });
    }, [connector]);
    const { networks, readOnlyUrls } = (0, hooks_1.useConfig)();
    const [error, setError] = (0, react_1.useState)(undefined);
    const networkStates = (0, context_1.useReadonlyNetworkStates)();
    const configuredChainIds = Object.keys(readOnlyUrls || {}).map((chainId) => parseInt(chainId, 10));
    const supportedChainIds = networks === null || networks === void 0 ? void 0 : networks.map((network) => network.chainId);
    (0, react_1.useEffect)(() => {
        const isNotConfiguredChainId = chainId && configuredChainIds && configuredChainIds.indexOf(chainId) < 0;
        const isUnsupportedChainId = chainId && supportedChainIds && supportedChainIds.indexOf(chainId) < 0;
        if (isUnsupportedChainId || isNotConfiguredChainId) {
            const chainIdError = new Error(`${isUnsupportedChainId ? 'Unsupported' : 'Not configured'} chain id: ${chainId}.`);
            chainIdError.name = 'ChainIdError';
            setError(chainIdError);
            return;
        }
        for (const networkState of Object.values(networkStates)) {
            if (networkState.errors.length > 0) {
                setError(networkState.errors[networkState.errors.length - 1]);
                return;
            }
        }
        setError(errors === null || errors === void 0 ? void 0 : errors[errors.length - 1]);
    }, [chainId, errors, networkStates]);
    return {
        connector: undefined,
        library: provider,
        chainId: (error === null || error === void 0 ? void 0 : error.name) === 'ChainIdError' ? undefined : provider !== undefined ? chainId : readonlyNetwork === null || readonlyNetwork === void 0 ? void 0 : readonlyNetwork.chainId,
        account,
        active: !!provider,
        activate: async (providerOrConnector) => {
            if ('getProvider' in providerOrConnector) {
                console.warn('Using web3-react connectors is deprecated and may lead to unexpected behavior.');
                await providerOrConnector.activate();
                return activate(await providerOrConnector.getProvider());
            }
            return activate(providerOrConnector);
        },
        activateBrowserWallet,
        deactivate,
        setError: () => {
            throw new Error('setError is deprecated');
        },
        error,
        isLoading,
        switchNetwork: async (chainId) => {
            await (connector === null || connector === void 0 ? void 0 : connector.switchNetwork(chainId));
        },
    };
}
exports.useEthers = useEthers;
const getAccount = (connector) => {
    if (connector === null || connector === void 0 ? void 0 : connector.accounts[0]) {
        return (0, utils_1.getAddress)(connector.accounts[0]);
    }
    return undefined;
};
//# sourceMappingURL=useEthers.js.map