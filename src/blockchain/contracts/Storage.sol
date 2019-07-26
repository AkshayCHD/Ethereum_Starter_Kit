pragma solidity >=0.4.22 <0.6.0;
contract Storage {
    uint public testNumber ;
    string public testString;

    constructor() public {
        testNumber = 1;
        testString = "Akshay's Starter Kit";
    }
}
