# Omega V12 Dice Pool System

The Omega V12 system extends FoundryVTT with a custom dice pool mechanic using d6s with "keep" mechanics.

## Dice Pool Syntax

The Omega Dice Pool system uses the syntax: `XkY+Z`

- **X** = Number of d6s to roll (1-10)
- **Y** = Number of dice to keep (1-10, must be ≤ X)
- **Z** = Modifier to add to the result (optional, can be positive or negative)

### Examples

- `5k4` = Roll 5d6, keep the highest 4 dice
- `7k4+3` = Roll 7d6, keep the highest 4 dice, add 3 to the result
- `3k2-1` = Roll 3d6, keep the highest 2 dice, subtract 1 from the result
- `10k10` = Roll 10d6, keep all 10 dice
- `1k1` = Roll 1d6, keep 1 die
- `0k0+3` = No dice rolled, result is 3 (static modifier only)
- `10k0+2` = No dice kept, result is 2 (static modifier only)

### Invalid Examples

- `5k6` = Invalid (keep > pool)
- `11k5` = Invalid (pool > 10)
- `5k11` = Invalid (keep > 10)
- `abc` = Invalid (not a formula)
- `5d6` = Standard dice notation (not dice pool)

## Usage

### In Item Formulas

You can use dice pool formulas in item roll formulas. When an item with a dice pool formula is rolled, it will automatically use the Omega Dice Pool system.

### In Chat

You can roll dice pools directly in chat using the command:
```
/roll 5k4+3
```

### Programmatically

```javascript
// Parse a dice pool formula
const parsed = game.omega.dicePool.parseDicePool('5k4+3');
// Returns: { pool: 5, keep: 4, modifier: 3 }

// Roll a dice pool
const roll = await game.omega.dicePool.rollDicePool('5k4+3');

// Create a chat message with a dice pool roll
await game.omega.dicePool.rollDicePoolChat('5k4+3');
```

## Roll Results

When a dice pool is rolled, the result includes:

- **Total**: The sum of kept dice + modifier
- **Kept Dice**: Array of the dice that were kept (highest values)
- **Dropped Dice**: Array of the dice that were dropped (lowest values)
- **All Dice**: Array of all dice rolled (before keeping/dropping)
- **Kept Total**: Sum of kept dice (before modifier)

## Display

Dice pool rolls are displayed in chat with:
- The formula used
- Which dice were kept vs dropped
- The calculation breakdown
- The final total

## System Features

- **Range Validation**: Pool size 1-10, keep size 1-10, keep ≤ pool (except 0k0 and Xk0)
- **Zero Dice Support**: 0k0 and Xk0 rolls result in no dice being kept, just the modifier
- **Visual Feedback**: Clear display of kept vs dropped dice
- **Modifier Support**: Positive and negative modifiers
- **Integration**: Works with existing FoundryVTT roll systems
- **Error Handling**: Invalid formulas return null/throw errors

## Testing

Use the `test-dice-pool.mjs` file to test the system functionality in the browser console.

## Technical Details

The system extends Foundry's `DiceTerm` class to handle the custom syntax and integrates with the existing roll infrastructure. It maintains compatibility with standard dice notation while adding the dice pool functionality. 