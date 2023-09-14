import mangoose from 'mangoose'

const ComputerSchema = new mangoose.Schema({

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
  }

});

const Computer = mangoose.model('computers', ComputerSchema);

export default Computer;