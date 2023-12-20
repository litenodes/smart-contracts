import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type LsDeployerConfig = {};

export function lsDeployerConfigToCell(config: LsDeployerConfig): Cell {
    return beginCell().endCell();
}

export class LsDeployer implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new LsDeployer(address);
    }

    static createFromConfig(config: LsDeployerConfig, code: Cell, workchain = 0) {
        const data = lsDeployerConfigToCell(config);
        const init = { code, data };
        return new LsDeployer(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
