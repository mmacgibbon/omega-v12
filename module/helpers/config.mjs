export const OMEGA = {};

/**
 * The set of Ability Scores used within the system.
 * @type {Object}
 */
OMEGA.abilities = {
  str: 'OMEGA.Ability.Str.long',
  dex: 'OMEGA.Ability.Dex.long',
  con: 'OMEGA.Ability.Con.long',
  int: 'OMEGA.Ability.Int.long',
  wis: 'OMEGA.Ability.Wis.long',
  cha: 'OMEGA.Ability.Cha.long',
};

OMEGA.abilityAbbreviations = {
  str: 'OMEGA.Ability.Str.abbr',
  dex: 'OMEGA.Ability.Dex.abbr',
  con: 'OMEGA.Ability.Con.abbr',
  int: 'OMEGA.Ability.Int.abbr',
  wis: 'OMEGA.Ability.Wis.abbr',
  cha: 'OMEGA.Ability.Cha.abbr',
};

/**
 * Dice Pool Configuration
 * @type {Object}
 */
OMEGA.dicePool = {
  minPool: 1,
  maxPool: 10,
  minKeep: 1,
  maxKeep: 10,
  dieSize: 6,
  syntax: 'XkY+Z where X = pool size, Y = keep size, Z = modifier'
};
