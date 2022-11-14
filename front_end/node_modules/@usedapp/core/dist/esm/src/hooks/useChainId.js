import { useConnector } from '../providers/network/connectors';
import { useConfig } from '../hooks';
import { useEffect, useState } from 'react';
/**
 * Internal hook for reading current chainId for calls.
 * @internal Intended for internal use - use it on your own risk
 */
export function useChainId(opts = {}) {
    var _a, _b, _c;
    const { connector } = useConnector();
    const { readOnlyChainId } = useConfig();
    const [chainId, setChainId] = useState();
    useEffect(() => {
        setChainId(connector === null || connector === void 0 ? void 0 : connector.chainId);
        if (!connector) {
            return;
        }
        return connector.updated.on(({ chainId }) => {
            setChainId(chainId);
        });
    }, [connector]);
    return (_c = (_b = (_a = opts === null || opts === void 0 ? void 0 : opts.queryParams) === null || _a === void 0 ? void 0 : _a.chainId) !== null && _b !== void 0 ? _b : chainId) !== null && _c !== void 0 ? _c : readOnlyChainId;
}
//# sourceMappingURL=useChainId.js.map