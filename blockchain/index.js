const Block = require('./block');

class Blockchain{
  constructor() {
    this.chain = [Block.genesis()];
  }

  addBlock(data) {
    const block = Block.mineBlock(this.chain[this.chain.length-1], data);
    this.chain.push(block);

    return block;
  }

  isValidChain(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;

    for (let i = 1; i < chain.length; i++) {
      const block = chain[i];
      const lastBlock = chain[i-1];

      if (block.lastHash !== lastBlock.hash || block.hash !== Block.blockHash(block)) {
        return false;
      }
    }
    // none of the blocks in the chain were deemed invalid
    return true;
  }

  replaceChain(newChain) {
    if (newChain.length <= this.chain.length) {
      console.log("New chain isn't longer than current chain");
      return;
    } else if (!this.isValidChain(newChain)) {
      console.log("New chain is not valid");
      return;
    }

    console.log("Replacing current chain with new chain");
    this.chain = newChain;
  }
}

module.exports = Blockchain;
