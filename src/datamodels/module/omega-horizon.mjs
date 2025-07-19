// Import document classes.
import { OmegaHorizonActor } from './documents/actor.mjs';
import { OmegaHorizonItem } from './documents/item.mjs';
// Import sheet classes.
import { OmegaHorizonActorSheet } from './sheets/actor-sheet.mjs';
import { OmegaHorizonItemSheet } from './sheets/item-sheet.mjs';
// Import helper/utility classes and constants.
import { OMEGA_HORIZON } from './helpers/config.mjs';
// Import DataModel classes
import * as models from './data/_module.mjs';

/* -------------------------------------------- */
/*  Init Hook                                   */
/* -------------------------------------------- */

// Add key classes to the global scope so they can be more easily used
// by downstream developers
globalThis.omegaHorizon = {
  documents: {
    OmegaHorizonActor,
    OmegaHorizonItem,
  },
  applications: {
    OmegaHorizonActorSheet,
    OmegaHorizonItemSheet,
  },
  utils: {
    rollItemMacro,
  },
  models,
};

Hooks.once('init', function () {
  // Add custom constants for configuration.
  CONFIG.OMEGA_HORIZON = OMEGA_HORIZON;

  /**
   * Set an initiative formula for the system
   * @type {String}
   */
  CONFIG.Combat.initiative = {
    formula: '1d20 + @abilities.dex.mod',
    decimals: 2,
  };

  // Define custom Document and DataModel classes
  CONFIG.Actor.documentClass = OmegaHorizonActor;

  // Note that you don't need to declare a DataModel
  // for the base actor/item classes - they are included
  // with the Character/NPC as part of super.defineSchema()
  CONFIG.Actor.dataModels = {
    character: models.OmegaHorizonCharacter,
    npc: models.OmegaHorizonNPC,
  };
  CONFIG.Item.documentClass = OmegaHorizonItem;
  CONFIG.Item.dataModels = {
    gear: models.OmegaHorizonGear,
    feature: models.OmegaHorizonFeature,
  };

  // Active Effects are never copied to the Actor,
  // but will still apply to the Actor from within the Item
  // if the transfer property on the Active Effect is true.
  CONFIG.ActiveEffect.legacyTransferral = false;

  // Register sheet application classes
  Actors.unregisterSheet('core', ActorSheet);
  Actors.registerSheet('omega-horizon', OmegaHorizonActorSheet, {
    makeDefault: true,
    label: 'OMEGA_HORIZON.SheetLabels.Actor',
  });
  Items.unregisterSheet('core', ItemSheet);
  Items.registerSheet('omega-horizon', OmegaHorizonItemSheet, {
    makeDefault: true,
    label: 'OMEGA_HORIZON.SheetLabels.Item',
  });
});

/* -------------------------------------------- */
/*  Setup Hook                                  */
/* -------------------------------------------- */

Hooks.once('setup', function () {
  // Do anything after initialization but before
  // ready hook.
});

/* -------------------------------------------- */
/*  Ready Hook                                  */
/* -------------------------------------------- */

Hooks.once('ready', function () {
  // Do anything once the system is ready.
});

/* -------------------------------------------- */
/*  Handlebars Helpers                          */
/* -------------------------------------------- */

// If you need to add Handlebars helpers, here's an example:
Handlebars.registerHelper('toLowerCase', function (str) {
  return str.toLowerCase();
});

/* -------------------------------------------- */
/*  Chat Message Handler                        */
/* -------------------------------------------- */

Hooks.on('preCreateChatMessage', function (chatData, options, userId) {
  // Check if the message is a roll and if it has the omega-horizon.itemMacro flag
  if (chatData.flags?.['omega-horizon']?.itemMacro) {
    // This is an item macro roll, so we'll handle it specially
    // You can add custom logic here if needed
  }
});

/* -------------------------------------------- */
/*  Item Macro Handler                          */
/* -------------------------------------------- */

/**
 * Handle clickable rolls.
 * @param {Event} event   The originating click event
 * @param {string} itemUuid The UUID of the item to roll
 * @private
 */
export async function rollItemMacro(itemUuid) {
  // Reconstruct the drop data so that we can load the item.
  const dropData = {
    type: 'Item',
    uuid: itemUuid,
  };

  const item = await Item.fromDropData(dropData);
  const itemName = item?.name ?? itemUuid;

  // Create a chat message with the item's roll data
  const rollData = item.getRollData();
  
  if (rollData.formula) {
    const roll = new Roll(rollData.formula, rollData);
    await roll.evaluate();
    
    const speaker = ChatMessage.getSpeaker({ actor: item.actor });
    const rollMode = game.settings.get('core', 'rollMode');
    
    await roll.toMessage({
      speaker,
      flavor: `[${item.type}] ${itemName}`,
      flags: { 'omega-horizon.itemMacro': true },
    }, { rollMode });
  } else {
    // If there's no roll data, send a chat message with the item's description
    const speaker = ChatMessage.getSpeaker({ actor: item.actor });
    
    ChatMessage.create({
      speaker,
      content: item.system.description ?? '',
      flags: { 'omega-horizon.itemMacro': true },
    });
  }
}
