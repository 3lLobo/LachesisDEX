const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.attach("0x660655EB385467fd95E19aE97a05188d9553B3Ea",);
    // const greeter = await Greeter.deploy("Hello, world!");
    await greeter.deployed();
    console.log("🚀 ~ file: sample-test.js ~ line 8 ~ Greeter", Greeter);
    
    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
