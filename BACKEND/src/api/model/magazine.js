import mongoose from 'mongoose';

const MagazineSchema = new mongoose.Schema({

  title:{
    type: String,
    required: true,
  },

  issuedDate:{
    type: Date,
    required: true,
  },

  typeoftheMagazine:{
    type: String,
    required: true,
  },

  publisher:{
    type: String
  },

  IDM:{
    type: String,
    unique: true, // Ensures uniqueness of ISBN
    required: true,
  }

});

const Magazine = mongoose.model('magazines', MagazineSchema);

export default Magazine;