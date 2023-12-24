import { toNano } from '@ton/core';
import { Pair } from '../wrappers/Pair';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const pair = provider.open(Pair.createFromConfig({}, await compile('Pair')));

    await pair.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(pair.address);

    // run methods on `pair`
}
