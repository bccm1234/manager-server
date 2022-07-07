const mongoose = require("mongoose");

const schema = mongoose.Schema({
    id: Number,
    abstract: {
        formula: String,
        element: [],
        elementnum: [],
        elementColor: [],
        a: Number,
        b: Number,
        c: Number,
        α: Number,
        β: Number,
        γ: Number,
        volume: Number,
        "band gap": Number,
        "crystal system": String,
        "space group": String,
        "energy above hull": Number,
        "predicted formation energy": Number,
        "magnetic ordering": String,
        "total magnetization": Number,
        "experimentally observed": String,
    },
    "crystal-strusture": {
        cal: {
            lattice: [Number, Number, Number, Number, Number, Number],
            crystalsystem: String,
            spacegroup: String,
            summary: {
                runtype: String,
                encut: Number,
                kpoint: String,
                u: String,
                code: String,
                inputUrl: String,
            },
        },
        exp: {
            lattice: [Number, Number, Number, Number, Number, Number],
            crystalsystem: String,
            spacegroup: String,
            doi: String,
        },
    },
    "band-dos": {
        bandUrl: String,
        dosUrl: String,
        cal: {
            bandgap: Number,
            summary: {
                runtype: String,
                encut: Number,
                kpoint: String,
                u: String,
                code: String,
                inputUrl: String,
            },
        },
        exp: {
            bandgap: Number,
            doi: String,
        },
    },
    "charge-density": {
        cifUrl: String,
        cubeUrl: String,
        summary: {
            runtype: String,
            encut: Number,
            kpoint: String,
            u: String,
            code: String,
            inputUrl: String,
        },
    },
});

const Materials = mongoose.model("material", schema, "materials");
module.exports = Materials;
