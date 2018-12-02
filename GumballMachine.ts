const chalk = require("chalk");
const log = console.log;
export const enum GumballMachineState {
  NO_QUARTER,
  HAS_QUARTER,
  SOLD,
  SOLD_OUT
}

export default class GumballMachine {
  public count: number;
  public state = GumballMachineState.NO_QUARTER;

  constructor(initCount: number) {
    this.count = initCount;
    this.state = GumballMachineState.NO_QUARTER;
  }

  handleInsertMoney(): string {
    let msg: string = "";
    switch (this.state) {
      case GumballMachineState.NO_QUARTER:
        this.state = GumballMachineState.HAS_QUARTER;
        msg = `You have ${
          this.state
        } credit. Turn the knob to get your gumball!`;
        log(chalk.yellow(msg));
        break;
      case GumballMachineState.SOLD_OUT:
        msg = `Keep your quarter...I have ${this.count} gumballs to give...`;
        log(chalk.red(msg));
        break;
      case GumballMachineState.HAS_QUARTER:
        msg =
          "Whoops, a quarted has already been inserted. Turn the knob to get your gumball, or choose refund to be a little sadder but a quarter richer ";
        log(chalk.yellow(msg));
    }
    return msg;
  }

  handleRefund(): string {
    let msg: string = "";
    switch (this.state) {
      case GumballMachineState.HAS_QUARTER:
        this.state = GumballMachineState.NO_QUARTER;
        msg = "here's your quarter back! may it bring forth greatness";
        log(chalk.green(msg));
        break;
      default:
        msg = "no quarter was added. no refund to issue.";
        log(chalk.yellow(msg));
    }
    return msg;
  }

  handleCrankTurn(): string {
    let msg: string = "";
    switch (this.state) {
      case GumballMachineState.NO_QUARTER:
        msg = `Gumball count: ${this.count}. Insert money to get a gumball.`;
        log(chalk.yellow(msg));
        break;
      case GumballMachineState.HAS_QUARTER:
        this.state = GumballMachineState.SOLD;
        msg = "Finding the perfect gumball for you...";
        log(chalk.green(msg));
        this.handleDispense();
        break;
      case GumballMachineState.SOLD_OUT:
        msg = "whoops! gumballs need to be restocked!";
        log(chalk.yellow(msg));
    }
    return msg;
  }

  handleDispense(): string {
    let msg: string = "";
    switch (this.state) {
      case GumballMachineState.SOLD_OUT:
        msg = "whoops! gumballs need to be restocked!";
        log(chalk.yellow(msg));
        break;
      case GumballMachineState.SOLD:
        if (this.count === 1) {
          msg = "Lucky you! That was the last gumball";
          log(chalk.yellow(msg));
        } else {
          msg = "enjoy your gumball!";
          log(chalk.green(msg));
        }
        this.updateGumballCount();
        break;
      case GumballMachineState.NO_QUARTER:
        msg = "it'll cost ya! pay up!";
        log(chalk.yellow(msg));
        break;
      case GumballMachineState.HAS_QUARTER:
        msg =
          "didn't want to turn the crank, eh? well, here's your gumball anyway";
        log(chalk.yellow(msg));
        this.updateGumballCount();
    }
    return msg;
  }

  updateGumballCount(): void {
    this.count--;
    if (this.count > 0) {
      this.state = GumballMachineState.NO_QUARTER;
    } else {
      this.state = GumballMachineState.SOLD_OUT;
    }
  }
}
