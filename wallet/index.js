const { INITAL_BALANCE} = require('../config');
const ChainUtil = require('../chain-util');

class Wallet{
    constructor() {
        this.balance = INITAL_BALANCE;
        this.keyPair = ChainUtil.genKeyPair();
        this.publicKey = this.keyPair.getPublic().encode('hex');
    }

    toString() {
        return `Wallet - 
            Balance: ${this.balance.toString()}
            Public Key: ${this.publicKey}`
    }
    
    sign(dataHash) {
        return this.keyPair.sign(dataHash);
    }
}

module.exports = Wallet;