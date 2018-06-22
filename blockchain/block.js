const ChainUtil = require('../chain-util');
const { DIFFICUTLY, MINE_RATE } = require("../config.js");

class Block {
  constructor(timestamp, lastHash, hash, data, nonce, difficutly) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.difficutly = difficutly || DIFFICUTLY;
  }

  toString() {
    return `Block -
        Timestamp: ${this.timestamp}
        Last Hash: ${this.lastHash}
        Hash: ${this.hash.substring(0, 10)}
        Nonce: ${this.nonce}
        Difficutly: ${this.difficutly}
        Data: ${this.data}`;
  }

  static genesis() {
    return new this("Genisis Time", "----", "f1r57-h45h", [], 0, DIFFICUTLY);
  }

  static mineBlock(lastBlock, data) {
    let timestamp, hash;
    const lastHash = lastBlock.hash;
    let { difficutly } = lastBlock;
    let nonce = 0;
    do {
      nonce++;
      timestamp = Date.now();
      difficutly = Block.adjustDifficutly(lastBlock, timestamp);
      hash = Block.hash(timestamp, lastHash, data, nonce, difficutly);
      const temp = '0'.repeat(difficutly);
      //console.log(`Hash: ${hash}`);
      //console.log(`Difficutly: ${difficutly} Equals: ${temp}`);
    } while (hash.substring(0, difficutly) !== '0'.repeat(difficutly));


    return new this(timestamp, lastHash, hash, data, nonce, difficutly);
  }

  static hash(timestamp, lastHash, data, nonce, difficutly) {
    return ChainUtil.hash(`${timestamp}${lastHash}${data}${nonce}${difficutly}`).toString();
  }

  static blockHash(block) {
    const {timestamp, lastHash, data, nonce, difficutly} = block;
    return Block.hash(timestamp, lastHash, data, nonce, difficutly);
  }

  static adjustDifficutly(lastBlock, currentTime) {
    let { difficutly } = lastBlock;
    difficutly = lastBlock.timestamp + MINE_RATE > currentTime ? difficutly+1 : difficutly-1;
    //console.log(`Adjusted difficutly is: ${difficutly}`);
    return difficutly;
  }
}

module.exports = Block;
