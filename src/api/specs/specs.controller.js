const Specs = require('./specs.model')
const { setError } = require('../../utils/error/error')
const { deleteFile } = require('../../middlewares/deleteFile')


const postNewSpecs = async (req, res, next) => {
    try {
        const newSpecs = new Specs()
        newSpecs.cpu = req.body.cpu
        newSpecs.ram = req.body.ram
        newSpecs.components = req.body.components
        //newSpecs.keyboard = req.body.keyboard
        if (req.file) {
            newSpecs.img = req.file.path
        }
        const specsDB = await newSpecs.save()
        return res.status(201).json(specsDB)
    } catch (error) {
        return next(setError(500, 'Specs not saved'))
    }
}

const getAllSpecs = async (req, res, next) => {
    try {
        const specsDB = await Specs.find().populate('components')
        res.status(200).json(specsDB)
    } catch (error) {
        return next(setError(500, 'Specs failed server'))
    }
}

const getSpecs = async (req, res, next) => {
    try {
        const { id } = req.params
        const specsDB = await Specs.findById(id).populate("components")
        if (!specsDB) {
            return next(setError(404, 'Specs not found'))
        }
        return res.status(200).json(specsDB)
    } catch (error) {
        return next(setError(500, 'Specs server error'))
    }
}

const patchSpecs = async (req, res, next) => {
    try {
        const { id } = req.params
        const patchSpecs = new Specs(req.body)
        patchSpecs._id = id
        if (req.file) {
            patchSpecs.img = req.file.path
        }
        const specsDB = await Specs.findByIdAndUpdate(id, patchSpecs)
        if (!specsDB) {
            return next(setError(404, 'Specs not found'))
        }
        if (specsDB.img) deleteFile(specsDB.img)
        return res.status(200).json({ new: patchSpecs, old: specsDB })
    } catch (error) {
        return next(setError(500, 'Specs Patch server error'))
    }
}

const deleteSpecs = async (req, res, next) => {
    try {
        const { id } = req.params
        const specsDB = await Specs.findByIdAndDelete(id)
        if (!specsDB) {
            return next(setError(404, 'Specs not found'))
        }
        if (specsDB.img) deleteFile(specsDB.img)
        return res.status(200).json(specsDB)
    } catch (error) {
        return next(setError(500, 'Specs removed server error'))
    }
}

module.exports = {
    postNewSpecs,
    getAllSpecs,
    getSpecs,
    patchSpecs,
    deleteSpecs
}
