import GumballMachine, { GumballMachineState } from "./GumballMachine";

describe("new Gumball Machine instance", () => {
  test("create gumballMachine instance with 5 gumballs", () => {
    const gumballMachine = new GumballMachine(5);
    expect(gumballMachine.count).toBe(5);
  });
});

describe("insert money", () => {
  test("1 no quarter after inserting coin", () => {
    const gumballMachine = new GumballMachine(1);
    gumballMachine.handleInsertMoney();
    expect(gumballMachine.state).toBe(1);
  });

  test("cannot accept another coin if machine already has 1 no quarter", () => {
    const gumballMachine = new GumballMachine(1);
    gumballMachine.state = 1;
    gumballMachine.handleInsertMoney();
    expect(
      "Whoops, a quarted has already been inserted. Turn the knob to get your gumball, or choose refund to be a little sadder but a quarter richer "
    );
  });
  test("cannot accept money if machine is sold out", () => {
    const gumballMachine = new GumballMachine(1);
    gumballMachine.state = GumballMachineState.SOLD_OUT;
    gumballMachine.handleInsertMoney();
    expect("Keep your quarter...I have zero gumballs to give...");
  });
});

describe("handle refund", () => {
  test("issue refund if machine has one no quarter", () => {
    const gumballMachine = new GumballMachine(1);
    gumballMachine.state = GumballMachineState.HAS_QUARTER;
    gumballMachine.handleRefund();
    expect("here's your quarter back! may it bring forth greatness");
  });

  test("no refund if machine has 0 no quarter", () => {
    const gumballMachine = new GumballMachine(1);
    gumballMachine.state = GumballMachineState.NO_QUARTER;
    gumballMachine.handleRefund();
    expect("no quarter was added. no refund to issue.");
  });
});

describe("handle crank turn", () => {
  test("sold out state after last gumball is dispensed", () => {
    const gumballMachine = new GumballMachine(1);
    gumballMachine.handleCrankTurn();
    expect(gumballMachine.state === GumballMachineState.SOLD_OUT);
  });
  test("notify user got last gumball", () => {
    const gumballMachine = new GumballMachine(1);
    gumballMachine.state = GumballMachineState.HAS_QUARTER;
    gumballMachine.handleCrankTurn();
    expect("Lucky you! That was the last gumball");
    
  });
  test("dispense gumball if machine has no quarter and crank is turned", () => {
    const gumballMachine = new GumballMachine(2);
    gumballMachine.state = GumballMachineState.HAS_QUARTER;
    gumballMachine.handleCrankTurn();
    expect(gumballMachine.count).toBe(1);
    expect("enjoy your gumball!");
  });

  test("nothing to dispense if machine has 0 no quarter", () => {
    const gumballMachine = new GumballMachine(1);
    gumballMachine.state = GumballMachineState.NO_QUARTER;
    gumballMachine.handleCrankTurn();
    expect(`Gumball count: 0. Insert money to get a gumball!`);
  });
  test("no gumballs to dispense if machine sold out", () => {
    const gumballMachine = new GumballMachine(1);
    gumballMachine.state = GumballMachineState.SOLD_OUT;
    gumballMachine.handleCrankTurn();
    expect("whoops! gumballs need to be restocked!");
  });
});
