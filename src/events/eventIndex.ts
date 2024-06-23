// Import all handlers from the client folder
import { registerReadyEvent } from './client/ready'
import { eventHandlerInteraction } from './client/interactionCreate'
import { eventHandlerMessage } from './client/messageCreate'

// Import all handlers from the server folder
import { guildCreateHandler } from './server/guildCreate'
import { guildDeleteHandler } from './server/guildDelete'
import { ExtendedClient } from '../interfaces/ExtendedClient'

// Function to initialize all event handlers
export function eventHandlers(client: ExtendedClient) {
  registerReadyEvent(client)
  eventHandlerInteraction(client)
  eventHandlerMessage(client)
  guildCreateHandler(client)
  guildDeleteHandler(client)
}
