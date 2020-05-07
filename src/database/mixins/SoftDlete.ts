/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-classes-per-file */
import { Model, QueryBuilder, Page, Modifiers } from 'objection'

export class CustomQueryBuilder<M extends Model, R = M[]> extends QueryBuilder<
  M,
  R
> {
  ArrayQueryBuilderType!: CustomQueryBuilder<M, M[]>

  SingleQueryBuilderType!: CustomQueryBuilder<M, M>

  NumberQueryBuilderType!: CustomQueryBuilder<M, number>

  PageQueryBuilderType!: CustomQueryBuilder<M, Page<M>>

  private options = {
    columnName: 'deleted_at',
    deletedValue: Model.fn.now(),
    notDeletedValue: null,
  }

  delete(): this['NumberQueryBuilderType'] {
    this.context({
      softDelete: true,
    })
    const patch: any = {}

    patch[this.options.columnName] = this.options.deletedValue

    return this.patch(patch)
  }

  hardDelete(): this['NumberQueryBuilderType'] {
    return super.delete()
  }

  undelete(): this['NumberQueryBuilderType'] {
    this.context({
      undelete: true,
    })

    const patch: any = {}

    patch[this.options.columnName] = this.options.notDeletedValue

    return this.patch(patch)
  }

  whereDeleted(): this {
    return this.whereNot(
      `${this.modelClass().tableName}.${this.options.columnName}`,
      this.options.notDeletedValue,
    )
  }

  whereNotDeleted(): this {
    return this.where(
      `${this.modelClass().tableName}.${this.options.columnName}`,
      this.options.notDeletedValue,
    )
  }
}

interface ClassType<InstanceType extends {} = {}> extends Function {
  new (...args: any[]): InstanceType
  prototype: InstanceType
  modifiers: Modifiers
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function SoftDelete<T extends ClassType<Model>>(Base: T) {
  class SoftDeleteModel extends Base {
    static QueryBuilder = CustomQueryBuilder

    QueryBuilderType: CustomQueryBuilder<this, this[]>

    static get modifiers(): Modifiers<CustomQueryBuilder<SoftDeleteModel>> {
      let baseModifiers = {}

      if (super.modifiers) {
        baseModifiers = { ...super.modifiers }
      }
      return {
        ...baseModifiers,
        notDeleted: (b: CustomQueryBuilder<SoftDeleteModel>): void => {
          b.whereNotDeleted()
        },
        deleted: (b: CustomQueryBuilder<SoftDeleteModel>): void => {
          b.whereDeleted()
        },
      }
    }

    static get isSoftDelete(): boolean {
      return true
    }
  }

  return SoftDeleteModel
}

export default SoftDelete
