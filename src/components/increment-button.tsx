import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { program } from "../anchor/setup";

import { PublicKey } from "@solana/web3.js";
import { Buffer } from "buffer";

export default function IncrementButton() {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    if (!publicKey) return;

    setIsLoading(true);

    const [counterPDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("counter")],
      program.programId
    );

    console.log("!!!!!!", counterPDA);
    try {
      // Create a transaction to invoke the increment function
      const transaction = await program.methods
        .increment() // This takes no arguments so we don't need to pass anything
        .accounts({
          counter: counterPDA,
        })
        .transaction();

      const transactionSignature = await sendTransaction(
        transaction,
        connection
      );

      console.log(
        `View on explorer: https://solana.fm/tx/${transactionSignature}?cluster=devnet-alpha`
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button className="w-24" onClick={onClick} disabled={!publicKey}>
      {isLoading ? "Loading" : "Increment"}
    </button>
  );
}
