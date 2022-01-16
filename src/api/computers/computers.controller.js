const Computer = require('./computers.model')
const Specs = require('../specs/specs.model')
const { setError } = require('../../utils/error/error')
const { deleteFile } = require('../../middlewares/deleteFile')


const postNewComputer = async (req, res, next) => {
    try {
        const newComputer = new Computer()
        newComputer.manufacturer = req.body.manufacturer
        newComputer.model = req.body.model
        newComputer.price = req.body.price
        newComputer.specs = req.body.specs
        if (req.file) {
            newComputer.img = req.file.path
        }
        const computerDB = await newComputer.save()
        return res.status(201).json(computerDB)
    } catch (error) {
        return next(setError(500, 'Computer not saved'))
    }
}

const getAllComputers = async (req, res, next) => {
    try {
        const computersDB = await Computer.find().populate('specs')
         
        res.status(200).json(computersDB)
    } catch (error) {
        return next(setError(500, 'Computer failed server'))
    }
}

const getComputer = async (req, res, next) => {
    try {
        const { id } = req.params
        const computerDB = await Computer.findById(id).populate('specs')
        if (!computerDB) {
            return next(setError(404, 'Computer not found'))
        }
        return res.status(200).json(computerDB)
    } catch (error) {
        return next(setError(500, 'Computer server error'))
    }
}

const patchComputer = async (req, res, next) => {
    try {
        const { id } = req.params
        const patchComputer = new Computer(req.body)
        patchComputer._id = id
        if (req.file) {
            patchComputer.img = req.file.path
        }
        const computerDB = await Computer.findByIdAndUpdate(id, patchComputer)
        if (!computerDB) {
            return next(setError(404, 'Computer not found'))
        }
        if (computerDB.img) deleteFile(computerDB.img)
        return res.status(200).json({ new: patchComputer, old: computerDB })
    } catch (error) {
        return next(setError(500, 'Computer Patch server error'))
    }
}

const deleteComputer = async (req, res, next) => {
    try {
        const { id } = req.params
        const computerDB = await Computer.findByIdAndDelete(id)
        if (!computerDB) {
            return next(setError(404, 'Computer not found'))
        }
        if (computerDB.img) deleteFile(computerDB.img)
        return res.status(200).json(computerDB)
    } catch (error) {
        return next(setError(500, 'Computer removed server error'))
    }
}

module.exports = {
    postNewComputer,
    getAllComputers,
    getComputer,
    patchComputer,
    deleteComputer
}
