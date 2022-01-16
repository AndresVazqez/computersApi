const Component = require('./components.model')
const { setError } = require('../../utils/error/error')
const { deleteFile } = require('../../middlewares/deleteFile')


const postNewComponent = async (req, res, next) => {
    try {
        const newComponent = new Component()
        newComponent.manufacturer = req.body.manufacturer,
        newComponent.model = req.body.model,
        newComponent.price = req.body.price
        if (req.file) {
            newComponent.img = req.file.path
        }
        const componentDB = await newComponent.save()
        return res.status(201).json(componentDB)
    } catch (error) {
        return next(setError(500, 'Component not saved'))
    }
}

const getAllComponents = async (req, res, next) => {
    try {
        const componentsDB = await Component.find()
        res.status(200).json(componentsDB)
    } catch (error) {
        return next(setError(500, 'Component failed server'))
    }
}

const getComponent = async (req, res, next) => {
    try {
        const { id } = req.params
        const componentDB = await Component.findById(id)
        if (!componentDB) {
            return next(setError(404, 'Component not found'))
        }
        return res.status(200).json(componentDB)
    } catch (error) {
        return next(setError(500, 'Component server error'))
    }
}

const patchComponent = async (req, res, next) => {
    try {
        const { id } = req.params
        const patchComponent = new Component(req.body)
        patchComponent._id = id
        if (req.file) {
            patchComponent.img = req.file.path
        }
        const componentDB = await Component.findByIdAndUpdate(id, patchComponent)
        if (!componentDB) {
            return next(setError(404, 'Component not found'))
        }
        if (componentDB.img) deleteFile(componentDB.img)
        return res.status(200).json({ new: patchComponent, old: componentDB })
    } catch (error) {
        return next(setError(500, 'Component Patch server error'))
    }
}

const deleteComponent = async (req, res, next) => {
    try {
        const { id } = req.params
        const componentDB = await Component.findByIdAndDelete(id)
        if (!componentDB) {
            return next(setError(404, 'Component not found'))
        }
        if (componentDB.img) deleteFile(componentDB.img)
        return res.status(200).json(componentDB)
    } catch (error) {
        return next(setError(500, 'Component removed server error'))
    }
}

module.exports = {
    postNewComponent ,
    getAllComponents,
    getComponent,
    patchComponent,
    deleteComponent
}
