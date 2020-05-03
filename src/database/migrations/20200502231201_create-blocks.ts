import * as Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('blocks', table => {
    table.increments()
    table.string('type').notNullable()
    table.json('data').notNullable()
    table.integer('list_position', 1).unsigned().notNullable()
    table.integer('item_id').unsigned().notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('blocks')
}
