export default class OmegaHorizonActorBase extends foundry.abstract
  .TypeDataModel {
  static LOCALIZATION_PREFIXES = ["OMEGA.Actor.base"];

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = {};

    schema.body = new fields.SchemaField({
      value: new fields.NumberField({
        ...requiredInteger,
        initial: 0,
        min: 0,
      }),
    });
    schema.mind = new fields.SchemaField({
      value: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
    });
    schema.biography = new fields.HTMLField();
    schema.career = new fields.StringField({ initial: "" });
    schema.species = new fields.StringField({ initial: "" });
    schema.faction = new fields.StringField({ initial: "" });

    return schema;
  }
}
