const movies = require("../data/peluquerias");
const Movie = require("../models/peluqueria.model");
const mongoose = require("mongoose");

mongoose
  .connect("URL de la BBDD")
  .then(async () => {
		
    const allPeluquerias = await Peluqueria.find();
		
				
    if (allPeluquerias.length) {
      await Peluqueria.collection.drop(); //La función drop borra la colección
    }
  })
  .catch((err) => console.log(`Error deleting data: ${err}`))
  .then(async () => {
		
		await Peluqueria.insertMany(movies);
	})
  .catch((err) => console.log(`Error creating data: ${err}`))
	// Por último nos desconectaremos de la DB.
  .finally(() => mongoose.disconnect());