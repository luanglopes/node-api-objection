import * as Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', table => {
    table.increments('id')
    table.string('first_name').notNullable()
    table.string('last_name')
    table.string('email').notNullable().unique()
    table.string('password').notNullable()
    table.timestamps()
    table.dateTime('deleted_at').defaultTo(null)
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users')
}
