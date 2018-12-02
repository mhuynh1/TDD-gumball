const readline = require("readline");
const chalk = require("chalk");
import GumballMachine from "./GumballMachine";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const useGumballMachine = (action: string): void => {
  switch (action.toLowerCase()) {
    case "insert":
      gumballMachine.handleInsertMoney();
      break;
    case "turn":
    case "turn crank":
      gumballMachine.handleCrankTurn();
      break;
    case "refund":
      gumballMachine.handleRefund();
  }
  rl.question(">", useGumballMachine);
};

const gumballMachine = new GumballMachine(3);
const promptMsg: string = chalk.blue(
  "Available actions - TYPE: 'insert', 'turn crank' or 'refund' to begin.\n"
);

rl.question(promptMsg, useGumballMachine);
