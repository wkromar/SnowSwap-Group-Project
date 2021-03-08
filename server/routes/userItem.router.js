const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
});

/**
 * POST route template
 */
router.post('/addToMyGear', (req, res) => {
  // POST route code here
    console.log('gear to add:', req.body, 'for', req.user.id);
    const userId = req.user.id;
    const gearToAdd = req.body
    
    try {
        const queryText = `
        INSERT INTO "items" ("user_id", "cat_id", "size", "price", "flex", "style", "brand", 
        "shape", "gender", "profile", "condition", "lacing_system", "description")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        RETURNING "id";
        `;

        pool.query( queryText, [
            userId,
            gearToAdd.cat,
            gearToAdd.size,
            gearToAdd.price,
            gearToAdd.flex,
            gearToAdd.style,
            gearToAdd.brand,
            gearToAdd.shape,
            gearToAdd.gender,
            gearToAdd.profile,
            gearToAdd.condition,
            gearToAdd.laving_system,
            gearToAdd.description,
        ])
        .then(results => {
            console.log('New gear added. Here is the ID');
            
        })
        
    } catch (err) {
        console.log('error POSTing to My Gear', err);
        
    }


});

module.exports = router;
