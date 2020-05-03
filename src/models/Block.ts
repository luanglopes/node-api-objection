import { Model } from 'objection'

export default class Block extends Model {
  static get tableName(): string {
    return 'blocks'
  }
}
