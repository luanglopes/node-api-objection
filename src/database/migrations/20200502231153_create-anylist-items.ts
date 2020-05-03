import * as Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('anylist_items', table => {
    table.increments()
    table.integer('anylist_id').unsigned().notNullable()
    table.integer('list_position', 1).unsigned().notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('anylist_items')
}
