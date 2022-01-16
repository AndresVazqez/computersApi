const ComputerRoutes = require('express').Router()
const { isAuth } = require('../../middlewares/auth')
const upload = require('../../middlewares/file')
const { postNewComputer, getAllComputers, getComputer, patchComputer, deleteComputer } = require('./computers.controller')


ComputerRoutes.get('/', getAllComputers)
ComputerRoutes.get('/:id', getComputer)
ComputerRoutes.post('/', [isAuth], upload.single('img'), postNewComputer)
// ComputerRoutes.patch('/:id', [isAuth], upload.single('img'), patchComputer)
// ComputerRoutes.delete('/:id', [isAuth], upload.single('img'), deleteComputer)

module.exports = ComputerRoutes