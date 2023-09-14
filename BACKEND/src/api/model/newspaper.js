const mongoose = require('mongoose');

const NewspaperSchema = new mongoose.Schema({

  title:{
    type: String,
    required: true,
  },

  issuedDate:{
    type: Date,
    required: true,
  },

  publisher:{
    type: String,
  
  },

  IDN:{
    type: String,
    unique: true, // Ensures uniqueness of ISBN
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  }

});

const Newspaper = mongoose.model('newspapers', NewspaperSchema);

export default Newspaper;