import { IdlAccounts, Program } from "@coral-xyz/anchor";
import { Counter } from "./counter";
import idl from "./counter.json";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { Buffer } from "buffer";

// const programId = new PublicKey("8C9Aq2hhTvu79DKHv5GQ1FJiY2KwKgN7Ej9r2ZEuQkYx");
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// Initialize the program interface with the IDL, program ID, and connection.
// This setup allows us to interact with the on-chain program using the defined interface.
// export const program = new Program<Counter>(IDL, programId, {
// connection,
// });
export const program = new Program(idl as Counter, {
  connection,
});
// const program = new Program(idl as Counter, provider);

export const [counterPDA] = PublicKey.findProgramAddressSync(
  [Buffer.from("counter")],
  program.programId
);

// This is just a TypeScript type for the Counter data structure based on the IDL
// We need this so TypeScript doesn't yell at us
export type CounterData = IdlAccounts<Counter>["counter"];
