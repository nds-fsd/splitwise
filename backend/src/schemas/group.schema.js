const mongoose = require('mongoose');


const GroupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, 
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },

    members: [{ 
      
      type: mongoose.Schema.Types.ObjectId, ref: 'User' 
    
    }],

  },
  {
    timestamps: true, 
  }
);


const Group = mongoose.model('Group', GroupSchema);


module.exports = { Group, GroupSchema };
