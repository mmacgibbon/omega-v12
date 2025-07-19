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

    data.lvl = this.attributes.level.value;

    return data;
  }
}
