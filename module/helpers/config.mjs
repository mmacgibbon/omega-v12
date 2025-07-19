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
 * Skill Groups Configuration
 * @type {Object}
 */
OMEGA.skillGroups = {
  athletics: 'OMEGA.SkillGroup.Athletics',
  combat: 'OMEGA.SkillGroup.Combat',
  social: 'OMEGA.SkillGroup.Social',
  technical: 'OMEGA.SkillGroup.Technical',
  knowledge: 'OMEGA.SkillGroup.Knowledge',
  perception: 'OMEGA.SkillGroup.Perception'
};

/**
 * Skills Configuration
 * @type {Object}
 */
OMEGA.skills = {
  // Athletics skills
  climb: 'OMEGA.Skill.Climb',
  swim: 'OMEGA.Skill.Swim',
  run: 'OMEGA.Skill.Run',
  jump: 'OMEGA.Skill.Jump',
  
  // Combat skills
  melee: 'OMEGA.Skill.Melee',
  ranged: 'OMEGA.Skill.Ranged',
  dodge: 'OMEGA.Skill.Dodge',
  
  // Social skills
  persuade: 'OMEGA.Skill.Persuade',
  intimidate: 'OMEGA.Skill.Intimidate',
  deceive: 'OMEGA.Skill.Deceive',
  
  // Technical skills
  computers: 'OMEGA.Skill.Computers',
  engineering: 'OMEGA.Skill.Engineering',
  medicine: 'OMEGA.Skill.Medicine',
  
  // Knowledge skills
  science: 'OMEGA.Skill.Science',
  history: 'OMEGA.Skill.History',
  streetwise: 'OMEGA.Skill.Streetwise',
  
  // Perception skills
  notice: 'OMEGA.Skill.Notice',
  search: 'OMEGA.Skill.Search',
  track: 'OMEGA.Skill.Track'
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
