const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// View list
router.get('/viewlist', (req, res, next) => {
    res.status(200).json({
        message: 'You can see the list',
        uuAppErrorMap: {},
    });
});

// Creating list
router.post('/createlist', [

    body('listItems', "Items are missing").isString(),
    body('listName', "List name is missing").isString(),
], (req, res, next) => {
    // Handle validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    
    console.log('Received data:', req.body);
    const list = {
        
        listName: req.body.listName,
        ListItems: req.body.listItems
    };

    res.status(200).json({
        message: 'You have created a list',
        createdList: list,
        uuAppErrorMap: {},
    });
});

// Editing an existing shopping list
router.post('/updatelist/:listId', (req, res, next) => {
    const listId = req.params.listId;
    res.status(201).json({
        message: 'You can change the list',
        uuAppErrorMap: {},
    });
});

// Detail of the list
router.get('/detaillist/:listId', (req, res, next) => {
    const listId = req.params.listId;
    res.status(201).json({
        message: 'You can see the detail of the list',
        uuAppErrorMap: {},
    });
});

// Delete list
router.delete('/deletelist/:listId', (req, res, next) => {
    const listId = req.params.listId;
    res.status(202).json({
        message: 'You deleted the list',
        uuAppErrorMap: {},
    });
});

// Inviting people to the list
router.post('/:listId/invite', (req, res, next) => {
    const listId = req.params.listId;
    res.status(201).json({
        message: 'You invited them',
        uuAppErrorMap: {},
    });
});

module.exports = router;