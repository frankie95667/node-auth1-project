module.exports = {
    all,
    findBy,
    findById,
    add
}

const db = require("../data/dbConfig");

function all(){
    return db("users").select("id", "username").orderBy("id");
}

function findBy(filter){
    return db("users").where(filter);
}

function findById(id){
    return db("users").select("id", "username").where({id}).first();
}

async function add(user){
  const [id] = await db("users").insert(user, "id"); 

   return findById(id);
}