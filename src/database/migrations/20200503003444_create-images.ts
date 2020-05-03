import * as Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('images', table => {
    table.increments()
    table.string('path').notNullable()
    table.string('filename').notNullable()
    table.string('mimetype').notNullable()
    table.integer('imageable_id').unsigned().notNullable()
    table.string('imageable_type').notNullable()
    table.dateTime('deleted_at').nullable().defaultTo(null)
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('images')
}
