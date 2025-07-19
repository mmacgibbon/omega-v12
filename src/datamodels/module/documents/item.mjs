/**
 * Extend the basic Item with some very simple modifications.
 * @extends {Item}
 */
export class OmegaHorizonItem extends Item {
  /**
   * Augment the basic Item data model with additional dynamic data.
   */
  prepareDerivedData() {
    super.prepareDerivedData();

    // Get the Item's data
    const itemData = this;
    const systemData = itemData.system;

    // Make modifications to data here. For example:
    if (systemData.roll) {
      systemData.roll.label = this.label;
    }
  }

  /**
   * Prepare a data object which defines the data schema used by dice roll commands against this Item
   * @override
   */
  getRollData() {
    // Starts off by populating the roll data with a shallow copy of `this.system`
    const rollData = { ...this.system };

    // Quit early if there's no parent actor
    if (!this.actor) return rollData;

    // If present, add the actor's roll data
    rollData.actor = this.actor.getRollData();

    return rollData;
  }

  /**
   * Handle clickable rolls.
   * @param {HTMLAttributeCollection} html      The rendered template
   * @param {Event} event                       The originating click event
   * @private
   */
  async roll() {
    // Basic template rendering data
    const token = this.actor?.token;
    const item = this;

    // Initialize chat data.
    const speaker = ChatMessage.getSpeaker({ actor: this.actor, token });
    const rollMode = game.settings.get('core', 'rollMode');
    const label = `[${item.type}] ${item.name}`;

    // If there's no roll data, send a chat message.
    if (!this.system.roll) {
      ChatMessage.create({
        speaker,
        content: item.system.description ?? '',
      });
      return;
    }

    // Otherwise, create a roll and send a chat message from it.
    const rollData = this.getRollData();

    // Invoke the roll and submit it to chat.
    const roll = new Roll(rollData.formula, rollData.actor);

    // const result = await roll.evaluate();
    await roll.toMessage({
      speaker,
      flavor: label,
    });
  }
}
