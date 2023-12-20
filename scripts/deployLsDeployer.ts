import { toNano } from '@ton/core';
import { LsDeployer } from '../wrappers/LsDeployer';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const lsDeployer = provider.open(LsDeployer.createFromConfig({}, await compile('LsDeployer')));

    await lsDeployer.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(lsDeployer.address);

    // run methods on `lsDeployer`
}
