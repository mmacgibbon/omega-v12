export const OMEGA = {};

/**
 * The set of Core Traits used within the Omega Horizon system.
 * @type {Object}
 */
OMEGA.coreTraits = {
  physical: {
    agi: 'OMEGA.Trait.Agi.long',
    aug: 'OMEGA.Trait.Aug.long',
    con: 'OMEGA.Trait.Con.long',
    gen: 'OMEGA.Trait.Gen.long',
    str: 'OMEGA.Trait.Str.long'
  },
  mental: {
    cha: 'OMEGA.Trait.Cha.long',
    cyb: 'OMEGA.Trait.Cyb.long',
    int: 'OMEGA.Trait.Int.long',
    psi: 'OMEGA.Trait.Psi.long',
    wit: 'OMEGA.Trait.Wit.long'
  }
};

OMEGA.coreTraitAbbreviations = {
  agi: 'OMEGA.Trait.Agi.abbr',
  aug: 'OMEGA.Trait.Aug.abbr',
  con: 'OMEGA.Trait.Con.abbr',
  gen: 'OMEGA.Trait.Gen.abbr',
  str: 'OMEGA.Trait.Str.abbr',
  cha: 'OMEGA.Trait.Cha.abbr',
  cyb: 'OMEGA.Trait.Cyb.abbr',
  int: 'OMEGA.Trait.Int.abbr',
  psi: 'OMEGA.Trait.Psi.abbr',
  wit: 'OMEGA.Trait.Wit.abbr'
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
