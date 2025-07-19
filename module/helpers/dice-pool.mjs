/**
 * Omega Dice Pool System
 * Extends Foundry's dice system to handle custom dice pool mechanics
 * Syntax: XkY+Z where X = number of dice, Y = number to keep, Z = modifier
 * Example: 5k4+3 means roll 5d6, keep highest 4, add 3
 */

export class OmegaDicePool {
  
  /**
   * Register the Omega Dice Pool system with Foundry
   */
  static register() {
    // Extend the DiceTerm class to handle our custom syntax
    this.extendDiceTerm();
    
    // Add custom roll methods to the global game object
    game.omega.rollDicePool = this.rollDicePool.bind(this);
    game.omega.parseDicePool = this.parseDicePool.bind(this);
    
    console.log('Omega Dice Pool System | Registered');
  }
  
  /**
   * Extend Foundry's DiceTerm to handle our custom syntax
   */
  static extendDiceTerm() {
    // Store the original evaluate method
    const originalEvaluate = DiceTerm.prototype.evaluate;
    
    // Override the evaluate method to handle our custom syntax
    DiceTerm.prototype.evaluate = function(options = {}) {
      // Check if this is a dice pool roll
      if (this.formula && this.formula.match(/^\d+k\d+/)) {
        return this.evaluateDicePool(options);
      }
      
      // Otherwise, use the original method
      return originalEvaluate.call(this, options);
    };
    
    // Add the dice pool evaluation method
    DiceTerm.prototype.evaluateDicePool = function(options = {}) {
      const parsed = OmegaDicePool.parseDicePool(this.formula);
      if (!parsed) {
        throw new Error(`Invalid dice pool formula: ${this.formula}`);
      }
      
      const { pool, keep, modifier } = parsed;
      
      // Handle 0k0 and Xk0 cases (no dice kept, just modifier)
      if ((pool === 0 && keep === 0) || keep === 0) {
        this.results = [];
        this.total = modifier;
        this.modifier = modifier;
        this.poolSize = 0;
        this.keepSize = 0;
        this.droppedRolls = [];
        this.allRolls = [];
        return this;
      }
      
      // Roll the dice
      const rolls = [];
      for (let i = 0; i < pool; i++) {
        rolls.push(Math.floor(Math.random() * 6) + 1);
      }
      
      // Sort in descending order and keep the highest
      rolls.sort((a, b) => b - a);
      const keptRolls = rolls.slice(0, keep);
      const droppedRolls = rolls.slice(keep);
      
      // Calculate total
      const keptTotal = keptRolls.reduce((sum, roll) => sum + roll, 0);
      const finalTotal = keptTotal + modifier;
      
      // Store results for display
      this.results = keptRolls.map(roll => ({ result: roll, active: true }));
      this.total = finalTotal;
      this.modifier = modifier;
      this.poolSize = pool;
      this.keepSize = keep;
      this.droppedRolls = droppedRolls;
      this.allRolls = rolls;
      
      return this;
    };
  }
  
  /**
   * Parse a dice pool formula
   * @param {string} formula - The formula to parse (e.g., "5k4+3")
   * @returns {Object|null} - Parsed result or null if invalid
   */
  static parseDicePool(formula) {
    // Match patterns like: 5k4, 5k4+3, 5k4-2, 0k0+3
    const match = formula.match(/^(\d+)k(\d+)([+-]\d+)?$/);
    if (!match) return null;
    
    const pool = parseInt(match[1]);
    const keep = parseInt(match[2]);
    const modifier = match[3] ? parseInt(match[3]) : 0;
    
    // Special cases: 0k0 and Xk0 are valid (no dice kept, just modifier)
    if (pool === 0 && keep === 0) {
      return { pool: 0, keep: 0, modifier };
    }
    if (keep === 0) {
      return { pool: 0, keep: 0, modifier };
    }
    
    // Validate ranges for normal dice pools
    if (pool < 1 || pool > 10) return null;
    if (keep < 1 || keep > 10) return null;
    if (keep > pool) return null;
    
    return { pool, keep, modifier };
  }
  
  /**
   * Roll a dice pool
   * @param {string} formula - The dice pool formula
   * @param {Object} options - Roll options
   * @returns {Promise<Roll>} - The roll result
   */
  static async rollDicePool(formula, options = {}) {
    const parsed = this.parseDicePool(formula);
    if (!parsed) {
      throw new Error(`Invalid dice pool formula: ${formula}`);
    }
    
    const { pool, keep, modifier } = parsed;
    
    // Create a custom roll
    const roll = new Roll(formula, {}, options);
    
    // Handle 0k0 and Xk0 cases (no dice kept, just modifier)
    if ((pool === 0 && keep === 0) || keep === 0) {
      roll.total = modifier;
      roll.results = [];
      roll._omegaData = {
        pool: 0,
        keep: 0,
        modifier,
        keptRolls: [],
        droppedRolls: [],
        allRolls: [],
        keptTotal: 0
      };
      return roll;
    }
    
    // Roll the dice
    const rolls = [];
    for (let i = 0; i < pool; i++) {
      rolls.push(Math.floor(Math.random() * 6) + 1);
    }
    
    // Sort in descending order and keep the highest
    rolls.sort((a, b) => b - a);
    const keptRolls = rolls.slice(0, keep);
    const droppedRolls = rolls.slice(keep);
    
    // Calculate total
    const keptTotal = keptRolls.reduce((sum, roll) => sum + roll, 0);
    const finalTotal = keptTotal + modifier;
    
    // Set roll properties
    roll.total = finalTotal;
    roll.results = keptRolls.map(roll => ({ result: roll, active: true }));
    roll._omegaData = {
      pool,
      keep,
      modifier,
      keptRolls,
      droppedRolls,
      allRolls,
      keptTotal
    };
    
    return roll;
  }
  
  /**
   * Format a dice pool roll for display
   * @param {Roll} roll - The roll to format
   * @returns {string} - Formatted roll message
   */
  static formatRoll(roll) {
    if (!roll._omegaData) return roll.formula;
    
    const { pool, keep, modifier, keptRolls, droppedRolls, keptTotal, allRolls } = roll._omegaData;
    
    let message = `<div class="omega-dice-pool">`;
    message += `<div class="omega-formula">${pool}k${keep}`;
    if (modifier > 0) message += `+${modifier}`;
    else if (modifier < 0) message += `${modifier}`;
    message += `</div>`;
    
    // Handle 0k0 and Xk0 cases (no dice kept)
    if ((pool === 0 && keep === 0) || keep === 0) {
      message += `<div class="omega-rolls">`;
      message += `<span class="omega-no-dice">No dice kept</span>`;
      message += `</div>`;
      
      message += `<div class="omega-total">`;
      message += `<span class="omega-modifier">${modifier}</span>`;
      message += `</div>`;
      message += `</div>`;
      
      return message;
    }
    
    message += `<div class="omega-rolls">`;
    message += `<span class="omega-kept">Kept: [${keptRolls.join(', ')}]</span>`;
    if (droppedRolls.length > 0) {
      message += `<span class="omega-dropped">Dropped: [${droppedRolls.join(', ')}]</span>`;
    }
    message += `</div>`;
    
    message += `<div class="omega-total">`;
    message += `<span class="omega-kept-total">${keptTotal}</span>`;
    if (modifier !== 0) {
      message += `<span class="omega-modifier">${modifier > 0 ? '+' : ''}${modifier}</span>`;
      message += `<span class="omega-equals">= ${roll.total}</span>`;
    }
    message += `</div>`;
    message += `</div>`;
    
    return message;
  }
  
  /**
   * Create a chat message for a dice pool roll
   * @param {string} formula - The dice pool formula
   * @param {Object} options - Roll options
   * @returns {Promise<ChatMessage>} - The chat message
   */
  static async rollDicePoolChat(formula, options = {}) {
    const roll = await this.rollDicePool(formula, options);
    
    const messageData = {
      user: game.user.id,
      speaker: ChatMessage.getSpeaker(),
      content: this.formatRoll(roll),
      roll: roll,
      type: CONST.CHAT_MESSAGE_TYPES.ROLL,
      flavor: `Omega Dice Pool: ${formula}`
    };
    
    return ChatMessage.create(messageData);
  }
}

// Add CSS for dice pool display
const style = document.createElement('style');
style.textContent = `
  .omega-dice-pool {
    font-family: 'Signika', sans-serif;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background: #f9f9f9;
    margin: 4px 0;
  }
  
  .omega-formula {
    font-weight: bold;
    font-size: 1.1em;
    color: #333;
    margin-bottom: 4px;
  }
  
  .omega-rolls {
    font-size: 0.9em;
    margin-bottom: 4px;
  }
  
  .omega-kept {
    color: #2d5;
    margin-right: 8px;
  }
  
  .omega-dropped {
    color: #999;
  }
  
  .omega-total {
    font-weight: bold;
    font-size: 1.1em;
  }
  
  .omega-kept-total {
    color: #2d5;
  }
  
  .omega-modifier {
    color: #666;
  }
  
  .omega-equals {
    color: #333;
    margin-left: 4px;
  }
  
  .omega-no-dice {
    color: #999;
    font-style: italic;
  }
`;
document.head.appendChild(style); 