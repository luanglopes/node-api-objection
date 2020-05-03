import * as Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('anylists', table => {
    table.increments()
    table.string('title')
    table.string('subtitle')
    table.string('list_type')
    table.string('slug').unique().notNullable()
    table.dateTime('published_at').defaultTo(null)
    table.integer('user_id').unsigned().notNullable()
    table.timestamps()
    table.dateTime('deleted_at').defaultTo(null)
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('anylists')
}
