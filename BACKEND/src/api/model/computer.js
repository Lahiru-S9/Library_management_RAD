import mongoose from 'mongoose'

const ComputerSchema = new mongoose.Schema({

  IDC:{
    type: String,
    unique: true, // Ensures uniqueness of ISBN
    required: true,
  },

  brand:{
    type: String,
    required: true,
  },

  status:{
    type: String,
    required: true,
  },

  manufacturedYear:{
    type: Date
  },
  
  user_id: {
    type: String,
    required: true,
  }

});

const Computer = mongoose.model('computers', ComputerSchema);

export default Computer;