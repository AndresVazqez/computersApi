const SpecsRoutes = require('express').Router()
const { isAuth } = require('../../middlewares/auth')
const upload = require('../../middlewares/file')
const { postNewSpecs, getAllSpecs, getSpecs, patchSpecs, deleteSpecs } = require('./specs.controller')


SpecsRoutes.get('/', getAllSpecs)
SpecsRoutes.get('/:id', getSpecs)
SpecsRoutes.post('/', [isAuth], upload.single('img'), postNewSpecs)
// SpecsRoutes.patch('/:id', [isAuth], upload.single('img'), patchSpecs)
// SpecsRoutes.delete('/:id', [isAuth], upload.single('img'), deleteSpecs)

module.exports = SpecsRoutes