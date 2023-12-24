import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type PairConfig = {};

export function pairConfigToCell(config: PairConfig): Cell {
    return beginCell().endCell();
}

export class Pair implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new Pair(address);
    }

    static createFromConfig(config: PairConfig, code: Cell, workchain = 0) {
        const data = pairConfigToCell(config);
        const init = { code, data };
        return new Pair(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
