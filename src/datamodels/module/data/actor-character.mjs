import OmegaHorizonActorBase from './base-actor.mjs';

export default class OmegaHorizonCharacter extends OmegaHorizonActorBase {
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
        agility: new fields.SchemaField({
          base: new fields.NumberField({
            ...requiredInteger,
            initial: 2,
            min: 0,
            max: 10,
          }),
          modifier: new fields.NumberField({
            ...requiredInteger,
            initial: 0,
            min: 0,
          }),
        }),
        augment: new fields.SchemaField({
          base: new fields.NumberField({
            ...requiredInteger,
            initial: 0,
            min: 0,
            max: 10,
          }),
          modifier: new fields.NumberField({
            ...requiredInteger,
            initial: 0,
            min: 0,
          }),
        }),
        constitution: new fields.SchemaField({
          base: new fields.NumberField({
            ...requiredInteger,
            initial: 2,
            min: 0,
            max: 10,
          }),
          modifier: new fields.NumberField({
            ...requiredInteger,
            initial: 0,
            min: 0,
          }),
        }),
        genetics: new fields.SchemaField({
          base: new fields.NumberField({
            ...requiredInteger,
            initial: 0,
            min: 0,
            max: 10,
          }),
          modifier: new fields.NumberField({
            ...requiredInteger,
            initial: 0,
            min: 0,
          }),
        }),
        strength: new fields.SchemaField({
          base: new fields.NumberField({
            ...requiredInteger,
            initial: 2,
            min: 0,
            max: 10,
          }),
          modifier: new fields.NumberField({
            ...requiredInteger,
            initial: 0,
            min: 0,
          }),
        }),
      }),
      mental: new fields.SchemaField({
        charisma: new fields.SchemaField({
          base: new fields.NumberField({
            ...requiredInteger,
            initial: 2,
            min: 0,
            max: 10,
          }),
          modifier: new fields.NumberField({
            ...requiredInteger,
            initial: 0,
            min: 0,
          }),
        }),
        cybernetics: new fields.SchemaField({
          base: new fields.NumberField({
            ...requiredInteger,
            initial: 0,
            min: 0,
            max: 10,
          }),
          modifier: new fields.NumberField({
            ...requiredInteger,
            initial: 0,
            min: 0,
          }),
        }),
        intellect: new fields.SchemaField({
          base: new fields.NumberField({
            ...requiredInteger,
            initial: 2,
            min: 0,
            max: 10,
          }),
          modifier: new fields.NumberField({
            ...requiredInteger,
            initial: 0,
            min: 0,
          }),
        }),
        psionics: new fields.SchemaField({
          base: new fields.NumberField({
            ...requiredInteger,
            initial: 0,
            min: 0,
            max: 10,
          }),
          modifier: new fields.NumberField({
            ...requiredInteger,
            initial: 0,
            min: 0,
          }),
        }),
        wits: new fields.SchemaField({
          base: new fields.NumberField({
            ...requiredInteger,
            initial: 2,
            min: 0,
            max: 10,
          }),
          modifier: new fields.NumberField({
            ...requiredInteger,
            initial: 0,
            min: 0,
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
      computers: new fields.SchemaField({
        value: new fields.NumberField({
          ...requiredInteger,
          initial: 0,
          min: 0,
          max: 10,
        }),
      }),
      engineering: new fields.SchemaField({
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
      medical: new fields.SchemaField({
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
      piloting: new fields.SchemaField({
        value: new fields.NumberField({
          ...requiredInteger,
          initial: 0,
          min: 0,
          max: 10,
        }),
      }),
      psionic: new fields.SchemaField({
        value: new fields.NumberField({
          ...requiredInteger,
          initial: 0,
          min: 0,
          max: 10,
        }),
      }),
      scoundrel: new fields.SchemaField({
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
      stealth: new fields.SchemaField({
        value: new fields.NumberField({
          ...requiredInteger,
          initial: 0,
          min: 0,
          max: 10,
        }),
      }),
      survival: new fields.SchemaField({
        value: new fields.NumberField({
          ...requiredInteger,
          initial: 0,
          min: 0,
          max: 10,
        }),
      }),
    });

    // Define Skills schema (structure only - no predefined skills)
    schema.skills = new fields.SchemaField({});

    return schema;
  }

  prepareDerivedData() {
    // Process Physical traits
    for (const [key, trait] of Object.entries(this.coreTraits.physical)) {
      // Calculate total value from base + modifier
      trait.value = trait.base + trait.modifier;
      // In Omega Horizon, the total value IS the modifier for rolls
      trait.mod = trait.value;
      // Handle trait label localization
      trait.label = game.i18n.localize(CONFIG.OMEGA_HORIZON.coreTraits.physical[key]) ?? key;
    }

    // Process Mental traits
    for (const [key, trait] of Object.entries(this.coreTraits.mental)) {
      // Calculate total value from base + modifier
      trait.value = trait.base + trait.modifier;
      // In Omega Horizon, the total value IS the modifier for rolls
      trait.mod = trait.value;
      // Handle trait label localization
      trait.label = game.i18n.localize(CONFIG.OMEGA_HORIZON.coreTraits.mental[key]) ?? key;
    }

    // Process Skill Groups (if any are defined)
    if (this.skillGroups) {
      for (const [key, group] of Object.entries(this.skillGroups)) {
        if (CONFIG.OMEGA_HORIZON.skillGroups && CONFIG.OMEGA_HORIZON.skillGroups[key]) {
          group.label = game.i18n.localize(CONFIG.OMEGA_HORIZON.skillGroups[key]) ?? key;
        } else {
          group.label = key;
        }
      }
    }

    // Process Skills (if any are defined)
    if (this.skills) {
      for (const [key, skill] of Object.entries(this.skills)) {
        if (CONFIG.OMEGA_HORIZON.skills && CONFIG.OMEGA_HORIZON.skills[key]) {
          skill.label = game.i18n.localize(CONFIG.OMEGA_HORIZON.skills[key]) ?? key;
        } else {
          skill.label = key;
        }
        
        // Get the associated trait value
        const traitKey = skill.trait;
        if (this.coreTraits.physical[traitKey]) {
          skill.traitValue = this.coreTraits.physical[traitKey].value;
        } else if (this.coreTraits.mental[traitKey]) {
          skill.traitValue = this.coreTraits.mental[traitKey].value;
        }
        
        // Get the associated skill group value
        const groupKey = skill.group;
        if (this.skillGroups && this.skillGroups[groupKey]) {
          skill.groupValue = this.skillGroups[groupKey].value;
        }
      }
    }

    // Calculate Body and Mind from core traits
    this.calculateBodyAndMind();
  }

  calculateBodyAndMind() {
    // Calculate Body from physical traits (base + modifier)
    let bodyTotal = 0;
    for (const [key, trait] of Object.entries(this.coreTraits.physical)) {
      bodyTotal += trait.value; // trait.value is already base + modifier
    }
    this.body.value = bodyTotal;

    // Calculate Mind from mental traits (base + modifier)
    let mindTotal = 0;
    for (const [key, trait] of Object.entries(this.coreTraits.mental)) {
      mindTotal += trait.value; // trait.value is already base + modifier
    }
    this.mind.value = mindTotal;
  }

  getRollData() {
    const data = {};

    // Copy the physical traits to the top level, so that rolls can use
    // formulas like `@agility.mod + 4`.
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
