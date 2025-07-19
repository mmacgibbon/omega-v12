export const OMEGA_HORIZON = {};

/**
 * The set of Core Traits used within the Omega Horizon system.
 * @type {Object}
 */
OMEGA_HORIZON.coreTraits = {
  physical: {
    agility: 'OMEGA.Trait.agility.long',
    augment: 'OMEGA.Trait.augment.long',
    constitution: 'OMEGA.Trait.constitution.long',
    genetics: 'OMEGA.Trait.genetics.long',
    strength: 'OMEGA.Trait.strength.long'
  },
  mental: {
    charisma: 'OMEGA.Trait.charisma.long',
    cybernetics: 'OMEGA.Trait.cybernetics.long',
    intellect: 'OMEGA.Trait.intellect.long',
    psionics: 'OMEGA.Trait.psionics.long',
    wits: 'OMEGA.Trait.wits.long'
  }
};

OMEGA_HORIZON.coreTraitAbbreviations = {
  agility: 'OMEGA.Trait.agility.abbr',
  augment: 'OMEGA.Trait.augment.abbr',
  constitution: 'OMEGA.Trait.constitution.abbr',
  genetics: 'OMEGA.Trait.genetics.abbr',
  strength: 'OMEGA.Trait.strength.abbr',
  charisma: 'OMEGA.Trait.charisma.abbr',
  cybernetics: 'OMEGA.Trait.cybernetics.abbr',
  intellect: 'OMEGA.Trait.intellect.abbr',
  psionics: 'OMEGA.Trait.psionics.abbr',
  wits: 'OMEGA.Trait.wits.abbr'
};

/**
 * Skill Groups Configuration
 * @type {Object}
 */
OMEGA_HORIZON.skillGroups = {
  athletics: 'OMEGA.SkillGroup.Athletics',
  combat: 'OMEGA.SkillGroup.Combat',
  computers: 'OMEGA.SkillGroup.Computers',
  engineering: 'OMEGA.SkillGroup.Engineering',
  knowledge: 'OMEGA.SkillGroup.Knowledge',
  medical: 'OMEGA.SkillGroup.Medical',
  perception: 'OMEGA.SkillGroup.Perception',
  piloting: 'OMEGA.SkillGroup.Piloting',
  psionic: 'OMEGA.SkillGroup.Psionic',
  scoundrel: 'OMEGA.SkillGroup.Scoundrel',
  social: 'OMEGA.SkillGroup.Social',
  stealth: 'OMEGA.SkillGroup.Stealth',
  survival: 'OMEGA.SkillGroup.Survival'
};

/**
 * Skills Configuration
 * @type {Object}
 */
OMEGA_HORIZON.skills = {
  // Skills will be defined here
};

/**
 * Dice Pool Configuration
 * @type {Object}
 */
OMEGA_HORIZON.dicePool = {
  minPool: 1,
  maxPool: 10,
  minKeep: 1,
  maxKeep: 10,
  dieSize: 6,
  syntax: 'XkY+Z where X = pool size, Y = keep size, Z = modifier'
};
