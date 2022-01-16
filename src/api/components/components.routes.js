const ComponentRoutes = require('express').Router()
const { isAuth } = require('../../middlewares/auth')
const upload = require('../../middlewares/file')
const { postNewComponent, getAllComponents, getComponent, patchComponent, deleteComponent } = require('./components.controller')


ComponentRoutes.get('/', getAllComponents)
ComponentRoutes.get('/:id', getComponent)
ComponentRoutes.post('/', [isAuth], upload.single('img'), postNewComponent)
// ComponentRoutes.patch('/:id', [isAuth], upload.single('img'), patchComponent)
// ComponentRoutes.delete('/:id', [isAuth], upload.single('img'), deleteComponent)

module.exports = ComponentRoutes