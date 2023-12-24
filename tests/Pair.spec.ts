import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { Pair } from '../wrappers/Pair';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('Pair', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('Pair');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let pair: SandboxContract<Pair>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        pair = blockchain.openContract(Pair.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await pair.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: pair.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and pair are ready to use
    });
});
