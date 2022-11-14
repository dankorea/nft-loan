"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const chai_1 = require("chai");
const testing_1 = require("../testing");
describe('useToken', async () => {
    let token;
    let config;
    let network1;
    beforeEach(async () => {
        ;
        ({ config, network1 } = await (0, testing_1.setupTestingConfig)());
        token = await (0, testing_1.deployMockToken)(network1.deployer);
    });
    it('returns correct token constants', async () => {
        const { result, waitForCurrent } = await (0, testing_1.renderDAppHook)(() => (0, __1.useToken)(token.address), {
            config,
        });
        await waitForCurrent((val) => val !== undefined);
        (0, chai_1.expect)(result.error).to.be.undefined;
        const res = {
            name: 'MOCKToken',
            symbol: 'MOCK',
            decimals: 18,
            totalSupply: testing_1.MOCK_TOKEN_INITIAL_BALANCE,
        };
        (0, chai_1.expect)(JSON.parse(JSON.stringify(result.current))).to.deep.equal(JSON.parse(JSON.stringify(res)));
    });
    it('should not throw error when token address is Falsy', async () => {
        const { result } = await (0, testing_1.renderDAppHook)(() => (0, __1.useToken)(null), {
            config,
        });
        (0, chai_1.expect)(result.error).to.be.undefined;
        (0, chai_1.expect)(result.current).to.be.undefined;
    });
});
//# sourceMappingURL=useToken.test.js.map