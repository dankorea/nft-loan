"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLookupAddress = void 0;
const react_1 = require("react");
const useEthers_1 = require("./useEthers");
/**
 * `useLookupAddress` is a hook that is used to retrieve the ENS (e.g. `name.eth`) for a specific address.
 * @param address address to lookup
 * @returns {} Object with the following:
  - `ens: string | null | undefined` - ENS name of the account or null if not found.
  - `isLoading: boolean` - indicates whether the lookup is in progress.
  - `error: Error | null` - error that occurred during the lookup or null if no error occurred.
 * @public
 * @example
 * const { account } = useEthers()
 * const { ens } = useLookupAddress(account)
 *
 * return (
 *   <p>Account: {ens ?? account}</p>
 * )
 */
function useLookupAddress(address) {
    const { library } = (0, useEthers_1.useEthers)();
    const [ens, setENS] = (0, react_1.useState)();
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        let mounted = true;
        void (async () => {
            if (!library || !address)
                return;
            try {
                setIsLoading(true);
                const resolved = await library.lookupAddress(address);
                if (!mounted)
                    return;
                setENS(resolved);
            }
            catch (e) {
                if (!mounted)
                    return;
                setError(e);
            }
            finally {
                setIsLoading(false);
            }
        })();
        return () => {
            mounted = false;
        };
    }, [address, library]);
    return { ens, isLoading, error };
}
exports.useLookupAddress = useLookupAddress;
//# sourceMappingURL=useLookupAddress.js.map