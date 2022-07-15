const mongoose = require("mongoose");

const schema = mongoose.Schema({
    abs: {
        id: String,
        model:String,
        substance: String,
        atom: [],
        cifurl:String,
        crysys:String,
        spagro:String,
        lattice:[],
    },
    opt:{
        param1:{
            source:String,
            lattice:[],
            maxtrix:String,
            crysys: String,
            spagro: String,
            totenergy: Number,
            formula:{},
            calsum:{
                func:String,
                encut:Number,
                kpoint:Number,
                u:String,
                magnetic:String,
                code:String,
                fileurl:String
            }
        },
        param2:{
            source:String,
            lattice:[],
            maxtrix:String,
            crysys: String,
            spagro: String,
            totenergy: Number,
            formula:{},
            calsum:{
                func:String,
                encut:Number,
                kpoint:Number,
                u:String,
                magnetic:String,
                code:String,
                fileurl:String
            }
        }
    },
    ele:{
        param1:{
            source:String,
            bandgap:Number,
            bandurl:String,
            dosurl:String,
            cifurl: String,
            cubeurl:String,
            calsys:{
                func:String,
                encut:Number,
                kpoint:Number,
                u:String,
                magnetic:String,
                code:String,
                fileurl:String
            }
        },
        param2:{
            source:String,
            bandgap:Number,
            bandurl:String,
            dosurl:String,
            cifurl: String,
            cubeurl:String,
            calsys:{
                func:String,
                encut:Number,
                kpoint:Number,
                u:String,
                magnetic:String,
                code:String,
                fileurl:String
            }
        }
    }
});

const Bulks = mongoose.model("bulk", schema, "bulks");
module.exports = Bulks;