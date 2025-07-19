export default class OmegaHorizonItemBase extends foundry.abstract
  .TypeDataModel {
  static LOCALIZATION_PREFIXES = ['OMEGA.Item.base'];

  static defineSchema() {
    const fields = foundry.data.fields;
    const schema = {};

    schema.description = new fields.HTMLField();

    return schema;
  }
}
