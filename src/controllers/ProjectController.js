const knex = require('../database');

module.exports = {
  async index(req, res) {
    try {
      const { user_id, page = 1 } = req.query;
      const query = knex('projects')
        .leftJoin('users', 'users.id', '=', 'projects.user_id')
        .select('projects.*', 'users.username')
        .limit(3)
        .offset((page - 1) * 3)
        .where('users.deleted_at', null);

      const countObj = knex('projects').count();

      if (user_id){
        query
          .where({ user_id });

        countObj
          .where({ user_id });
      }
     
      const [count] = await countObj;
      res.header('X-Total-Count', count["count"])

      console.log(query.toString());
      const results = await query;

      return res.json(results);
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next){
    try {
      const { title, user_id } = req.body
      await knex('projects')
        .insert({ 
          title,
          user_id
        });  

      return res.status(201).send();
    } catch (error) {
      next(error);
    }
  }, 

  // async update(req, res, next){
  //   try {
  //     const { username } = req.body;
  //     const { id } = req.params;
  //     await knex('projects')
  //       .update({ username })
  //       .where({ id })

  //       return res.send();
  //   } catch (error) {
  //     next(error);      
  //   }
  // },

  // async delete(req, res, next){
  //   try {
  //     const { id } = req.params;
  //     await knex('projects')
  //       .where({id})
  //       .del();

  //       return res.send();
  //   } catch (error) {
  //     next(error);      
  //   }
  // }
}