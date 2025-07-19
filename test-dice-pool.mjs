/**
 * Test script for Omega Dice Pool System
 * Run this in the browser console to test the dice pool functionality
 */

// Test the dice pool parsing
console.log('Testing Omega Dice Pool System...');

// Test valid formulas
const testFormulas = [
  '5k4',
  '7k4+3',
  '3k2-1',
  '10k10',
  '1k1',
  '0k0+3',
  '10k0+2'
];

console.log('Testing valid formulas:');
testFormulas.forEach(formula => {
  const parsed = game.omega.dicePool.parseDicePool(formula);
  console.log(`${formula} ->`, parsed);
});

// Test invalid formulas
const invalidFormulas = [
  '5k6', // keep > pool
  '11k5', // pool > 10
  '5k11', // keep > 10
  'abc', // not a formula
  '5d6', // standard dice notation
];

console.log('Testing invalid formulas:');
invalidFormulas.forEach(formula => {
  const parsed = game.omega.dicePool.parseDicePool(formula);
  console.log(`${formula} ->`, parsed);
});

// Test actual rolls
console.log('Testing actual rolls:');
async function testRolls() {
  for (const formula of testFormulas) {
    try {
      const roll = await game.omega.dicePool.rollDicePool(formula);
      console.log(`${formula} roll:`, roll);
      console.log('  Total:', roll.total);
      console.log('  Omega data:', roll._omegaData);
    } catch (error) {
      console.error(`Error rolling ${formula}:`, error);
    }
  }
}

// Run the roll tests
testRolls();

console.log('Omega Dice Pool System test complete!'); 