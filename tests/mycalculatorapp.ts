import assert from 'assert';
import * as anchor from '@project-serum/anchor'
import {BN} from "@project-serum/anchor";


const SystemProgram = anchor.web3.SystemProgram;

describe('my_calc_app', () => {
  const provider = anchor.AnchorProvider.local();
  anchor.setProvider(provider)

  const calculator = anchor.web3.Keypair.generate()
  const program = anchor.workspace.Mycalculatorapp


  it('Creates a calculator', async () => {
    await program.rpc.create('HELLO WORLD', {
      accounts: {
        calculator: calculator.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId
      },
      signers: [calculator]
    })

    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.greeting === "HELLO WORLD")
  })

  it('Additional function', async () =>{
    await program.rpc.add(new BN(10), new BN(20), {
      accounts: {
        calculator: calculator.publicKey,
      }
    })

    const account = await program.account.calculator.fetch(calculator.publicKey);

    assert.ok(account.result.eq(new BN(30)))
  })

})