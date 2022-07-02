const CUSTOM_FUNCTIONS = `
  CREATE OR REPLACE FUNCTION on_update_timestamp()
  RETURNS trigger AS $$
  BEGIN
    NEW.updated_at = now();
    RETURN NEW;
  END;
  $$ LANGUAGE 'plpgsql';
`

const DROP_CUSTOM_FUNCIONS = `
  DROP FUNCTION on_update_timestamp()
`

exports.up = async function (knex){
  return knex.raw(CUSTOM_FUNCTIONS)
}

exports.down = async function (knex){
  return knex.raw(DROP_CUSTOM_FUNCIONS)
}