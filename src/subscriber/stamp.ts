import { EventSubscriber, EntitySubscriberInterface, InsertEvent } from 'typeorm'

@EventSubscriber()
export class PostSubscriber implements EntitySubscriberInterface {

  /**
   * Called before entity insertion.
   */
  beforeInsert(event: InsertEvent<any>) {
    //console.log(`BEFORE ENTITY INSERTED: `, event.entity);
  }
  beforeUpdate(event: InsertEvent<any>) {
    //console.log(`BEFORE ENTITY UPDATED: `, event);
  }
}