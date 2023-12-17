const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Mark item in the list as solved
router.get('/mark-resolved', (req, res, next) => {
    res.status(200).json({
        message: 'Item marked as solved',
        uuAppErrorMap: {},
    });
});

// Adding items in the list with validation
router.post('/additem', [
    body("username").isString(),
    body('listId').isInt(),
    body('itemName').isString(),
    body('quantity').isInt(),
    body('unit').isString(),
], (req, res, next) => {
    console.log("debug")
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: {
                message: 'Validation failed',
                details: errors.array(),
            },
        });
    }

    const item = {
        listId: req.body.listId,
        itemName: req.body.itemName,
        quantity: req.body.quantity,
        unit: req.body.quantity,
    };

    res.status(200).json({
        message: 'You added an item',
        item: item,
        uuAppErrorMap: {},
    });
});

// Deleting item from the list
router.post('/deleteditem', (req, res, next) => {
    res.status(200).json({
        message: 'You deleted an item',
        uuAppErrorMap: {},
    });
});

module.exports = router;