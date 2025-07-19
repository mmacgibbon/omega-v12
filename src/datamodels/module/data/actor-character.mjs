import OmegaActorBase from './base-actor.mjs';

export default class OmegaCharacter extends OmegaActorBase {
  static LOCALIZATION_PREFIXES = [
    ...super.LOCALIZATION_PREFIXES,
    'OMEGA.Actor.Character',
  ];

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    schema.attributes = new fields.SchemaField({
      level: new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 1 }),
      }),
    });

    // Define Core Traits schema
    schema.coreTraits = new fields.SchemaField({
      physical: new fields.SchemaField({
        agi: new fields.SchemaField({
          value: new fields.NumberField({
            ...requiredInteger,
            initial: 1,
            min: 1,
            max: 10,
          }),
        }),
        aug: new fields.SchemaField({
          value: new fields.NumberField({
            ...requiredInteger,
            initial: 1,
            min: 1,
            max: 10,
          }),
        }),
        con: new fields.SchemaField({
          value: new fields.NumberField({
            ...requiredInteger,
            initial: 1,
            min: 1,
            max: 10,
          }),
        }),
        gen: new fields.SchemaField({
          value: new fields.NumberField({
            ...requiredInteger,
            initial: 1,
            min: 1,
            max: 10,
          }),
        }),
        str: new fields.SchemaField({
          value: new fields.NumberField({
            ...requiredInteger,
            initial: 1,
            min: 1,
            max: 10,
          }),
        }),
      }),
      mental: new fields.SchemaField({
        cha: new fields.SchemaField({
          value: new fields.NumberField({
            ...requiredInteger,
            initial: 1,
            min: 1,
            max: 10,
          }),
        }),
        cyb: new fields.SchemaField({
          value: new fields.NumberField({
            ...requiredInteger,
            initial: 1,
            min: 1,
            max: 10,
          }),
        }),
        int: new fields.SchemaField({
          value: new fields.NumberField({
            ...requiredInteger,
            initial: 1,
            min: 1,
            max: 10,
          }),
        }),
        psi: new fields.SchemaField({
          value: new fields.NumberField({
            ...requiredInteger,
            initial: 1,
            min: 1,
            max: 10,
          }),
        }),
        wit: new fields.SchemaField({
          value: new fields.NumberField({
            ...requiredInteger,
            initial: 1,
            min: 1,
            max: 10,
          }),
        }),
      }),
    });

    // Define Skill Groups schema
    schema.skillGroups = new fields.SchemaField({
      athletics: new fields.SchemaField({
        value: new fields.NumberField({
          ...requiredInteger,
          initial: 0,
          min: 0,
          max: 10,
        }),
      }),
      combat: new fields.SchemaField({
        value: new fields.NumberField({
          ...requiredInteger,
          initial: 0,
          min: 0,
          max: 10,
        }),
      }),
      social: new fields.SchemaField({
        value: new fields.NumberField({
          ...requiredInteger,
          initial: 0,
          min: 0,
          max: 10,
        }),
      }),
      technical: new fields.SchemaField({
        value: new fields.NumberField({
          ...requiredInteger,
          initial: 0,
          min: 0,
          max: 10,
        }),
      }),
      knowledge: new fields.SchemaField({
        value: new fields.NumberField({
          ...requiredInteger,
          initial: 0,
          min: 0,
          max: 10,
        }),
      }),
      perception: new fields.SchemaField({
        value: new fields.NumberField({
          ...requiredInteger,
          initial: 0,
          min: 0,
          max: 10,
        }),
      }),
    });

    // Define Skills schema
    schema.skills = new fields.SchemaField({
      // Athletics skills
      climb: new fields.SchemaField({
        value: new fields.NumberField({
          ...requiredInteger,
          initial: 0,
          min: 0,
          max: 10,
        }),
        trait: new fields.StringField({ initial: 'str' }),
        group: new fields.StringField({ initial: 'athletics' }),
      }),
      swim: new fields.SchemaField({
        value: new fields.NumberField({
          ...requiredInteger,
          initial: 0,
          min: 0,
          max: 10,
        }),
        trait: new fields.StringField({ initial: 'str' }),
        group: new fields.StringField({ initial: 'athletics' }),
      }),
      run: new fields.SchemaField({
        value: new fields.NumberField({
          ...requiredInteger,
          initial: 0,
          min: 0,
          max: 10,
        }),
        trait: new fields.StringField({ initial: 'agi' }),
        group: new fields.StringField({ initial: 'athletics' }),
      }),
      jump: new fields.SchemaField({
        value: new fields.NumberField({
          ...requiredInteger,
          initial: 0,
          min: 0,
          max: 10,
        }),
        trait: new fields.StringField({ initial: 'str' }),
        group: new fields.StringField({ initial: 'athletics' }),
      }),
      
      // Combat skills
      melee: new fields.SchemaField({
        value: new fields.NumberField({
          ...requiredInteger,
          initial: 0,
          min: 0,
          max: 10,
        }),
        trait: new fields.StringField({ initial: 'agi' }),
        group: new fields.StringField({ initial: 'combat' }),
      }),
      ranged: new fields.SchemaField({
        value: new fields.NumberField({
          ...requiredInteger,
          initial: 0,
          min: 0,
          max: 10,
        }),
        trait: new fields.StringField({ initial: 'agi' }),
        group: new fields.StringField({ initial: 'combat' }),
      }),
      dodge: new fields.SchemaField({
        value: new fields.NumberField({
          ...requiredInteger,
          initial: 0,
          min: 0,
          max: 10,
        }),
        trait: new fields.StringField({ initial: 'agi' }),
        group: new fields.StringField({ initial: 'combat' }),
      }),
      
      // Social skills
      persuade: new fields.SchemaField({
        value: new fields.NumberField({
          ...requiredInteger,
          initial: 0,
          min: 0,
          max: 10,
        }),
        trait: new fields.StringField({ initial: 'cha' }),
        group: new fields.StringField({ initial: 'social' }),
      }),
      intimidate: new fields.SchemaField({
        value: new fields.NumberField({
          ...requiredInteger,
          initial: 0,
          min: 0,
          max: 10,
        }),
        trait: new fields.StringField({ initial: 'cha' }),
        group: new fields.StringField({ initial: 'social' }),
      }),
      deceive: new fields.SchemaField({
        value: new fields.NumberField({
          ...requiredInteger,
          initial: 0,
          min: 0,
          max: 10,
        }),
        trait: new fields.StringField({ initial: 'cha' }),
        group: new fields.StringField({ initial: 'social' }),
      }),
      
      // Technical skills
      computers: new fields.SchemaField({
        value: new fields.NumberField({
          ...requiredInteger,
          initial: 0,
          min: 0,
          max: 10,
        }),
        trait: new fields.StringField({ initial: 'int' }),
        group: new fields.StringField({ initial: 'technical' }),
      }),
      engineering: new fields.SchemaField({
        value: new fields.NumberField({
          ...requiredInteger,
          initial: 0,
          min: 0,
          max: 10,
        }),
        trait: new fields.StringField({ initial: 'int' }),
        group: new fields.StringField({ initial: 'technical' }),
      }),
      medicine: new fields.SchemaField({
        value: new fields.NumberField({
          ...requiredInteger,
          initial: 0,
          min: 0,
          max: 10,
        }),
        trait: new fields.StringField({ initial: 'int' }),
        group: new fields.StringField({ initial: 'technical' }),
      }),
      
      // Knowledge skills
      science: new fields.SchemaField({
        value: new fields.NumberField({
          ...requiredInteger,
          initial: 0,
          min: 0,
          max: 10,
        }),
        trait: new fields.StringField({ initial: 'int' }),
        group: new fields.StringField({ initial: 'knowledge' }),
      }),
      history: new fields.SchemaField({
        value: new fields.NumberField({
          ...requiredInteger,
          initial: 0,
          min: 0,
          max: 10,
        }),
        trait: new fields.StringField({ initial: 'int' }),
        group: new fields.StringField({ initial: 'knowledge' }),
      }),
      streetwise: new fields.SchemaField({
        value: new fields.NumberField({
          ...requiredInteger,
          initial: 0,
          min: 0,
          max: 10,
        }),
        trait: new fields.StringField({ initial: 'wit' }),
        group: new fields.StringField({ initial: 'knowledge' }),
      }),
      
      // Perception skills
      notice: new fields.SchemaField({
        value: new fields.NumberField({
          ...requiredInteger,
          initial: 0,
          min: 0,
          max: 10,
        }),
        trait: new fields.StringField({ initial: 'wit' }),
        group: new fields.StringField({ initial: 'perception' }),
      }),
      search: new fields.SchemaField({
        value: new fields.NumberField({
          ...requiredInteger,
          initial: 0,
          min: 0,
          max: 10,
        }),
        trait: new fields.StringField({ initial: 'wit' }),
        group: new fields.StringField({ initial: 'perception' }),
      }),
      track: new fields.SchemaField({
        value: new fields.NumberField({
          ...requiredInteger,
          initial: 0,
          min: 0,
          max: 10,
        }),
        trait: new fields.StringField({ initial: 'wit' }),
        group: new fields.StringField({ initial: 'perception' }),
      }),
    });

    return schema;
  }

  prepareDerivedData() {
    // Process Physical traits
    for (const [key, trait] of Object.entries(this.coreTraits.physical)) {
      // In Omega Horizon, the trait value IS the modifier
      trait.mod = trait.value;
      // Handle trait label localization
      trait.label = game.i18n.localize(CONFIG.OMEGA.coreTraits.physical[key]) ?? key;
    }

    // Process Mental traits
    for (const [key, trait] of Object.entries(this.coreTraits.mental)) {
      // In Omega Horizon, the trait value IS the modifier
      trait.mod = trait.value;
      // Handle trait label localization
      trait.label = game.i18n.localize(CONFIG.OMEGA.coreTraits.mental[key]) ?? key;
    }

    // Process Skill Groups
    for (const [key, group] of Object.entries(this.skillGroups)) {
      group.label = game.i18n.localize(CONFIG.OMEGA.skillGroups[key]) ?? key;
    }

    // Process Skills
    for (const [key, skill] of Object.entries(this.skills)) {
      skill.label = game.i18n.localize(CONFIG.OMEGA.skills[key]) ?? key;
      // Get the associated trait value
      const traitKey = skill.trait;
      if (this.coreTraits.physical[traitKey]) {
        skill.traitValue = this.coreTraits.physical[traitKey].value;
      } else if (this.coreTraits.mental[traitKey]) {
        skill.traitValue = this.coreTraits.mental[traitKey].value;
      }
      // Get the associated skill group value
      const groupKey = skill.group;
      if (this.skillGroups[groupKey]) {
        skill.groupValue = this.skillGroups[groupKey].value;
      }
    }
  }

  getRollData() {
    const data = {};

    // Copy the physical traits to the top level, so that rolls can use
    // formulas like `@agi.mod + 4`.
    if (this.coreTraits.physical) {
      for (let [k, v] of Object.entries(this.coreTraits.physical)) {
        data[k] = foundry.utils.deepClone(v);
      }
    }

    // Copy the mental traits to the top level
    if (this.coreTraits.mental) {
      for (let [k, v] of Object.entries(this.coreTraits.mental)) {
        data[k] = foundry.utils.deepClone(v);
      }
    }

    // Copy skill groups to the top level
    if (this.skillGroups) {
      for (let [k, v] of Object.entries(this.skillGroups)) {
        data[k] = foundry.utils.deepClone(v);
      }
    }

    // Copy skills to the top level
    if (this.skills) {
      for (let [k, v] of Object.entries(this.skills)) {
        data[k] = foundry.utils.deepClone(v);
      }
    }

    data.lvl = this.attributes.level.value;

    return data;
  }
}
