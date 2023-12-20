import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { LsDeployer } from '../wrappers/LsDeployer';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('LsDeployer', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('LsDeployer');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let lsDeployer: SandboxContract<LsDeployer>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        lsDeployer = blockchain.openContract(LsDeployer.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await lsDeployer.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: lsDeployer.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and lsDeployer are ready to use
    });
});
