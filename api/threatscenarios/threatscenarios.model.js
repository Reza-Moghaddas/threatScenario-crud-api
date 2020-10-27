'use strict';
const { Int32 } = require('bson');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ThreatScenarioSchema = new Schema({
      title : {
         type: String,
         required: true
      },
      description : {
         type: String
      },
      relatedAsset : {
         type: String
      },
      clasification : {
         type: String
      },
      impact : {
         type: Number,
         min:0,
         max:3,
         default: true
      },
      likelihood : {
        type: Number,
        min:0,
        max:3,         
        default: true
     },
     riskLevel : {
        type: Number,
        default: function() {
         return (this.impact + this.likelihood) / 2
       }
     }
},{
     id: false,
     toObject: {
         virtuals: true,
         getters: true
     },
     toJSON: {
         virtuals: true,
         getters: true,
         setters: false
     },
     timestamps: true
});

ThreatScenarioSchema.pre('find', function () {
     this.where({ is_active: { $ne: false } });
});
module.exports = mongoose.model('ThreatScenario', ThreatScenarioSchema);