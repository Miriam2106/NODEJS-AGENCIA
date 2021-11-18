const express = require('express');
const router = express.Router();

const pool = require('../database.js');

router.get('/',async(req,res)=>{
    let listMarcas = await pool.query('SELECT * FROM marca');
    res.json({
        status:"200",
        message:"Se ha recuperado correctamente",
        listMarcas: listMarcas
    });
});

router.get('/:id',async(req,res)=>{
    const {id} = req.params;
    let marca = await pool.query('SELECT * FROM marca WHERE id=?',[id]);
    res.json({
        status:"200",
        message:"Se ha recuperado correctamente",
        marca: marca
    });
});

router.post('/create',async(req,res)=>{
    const {nombre} = req.body;
    const marca={nombre};
    await pool.query('INSERT INTO marca set ?', [marca]);
    res.json({
        status:"200",
        message:"Se ha registrado correctamente",
        marca: marca
    });
});

router.post('/update/:id',async(req,res)=>{
    const {id} = req.params;
    const {nombre} = req.body;
    const marca={nombre};
    await pool.query('UPDATE marca SET ? WHERE id = ?',[marca,id]);
    res.json({
        status:"200",
        message:"Se ha actualizado correctamente",
        marca: marca
    });
});

router.post('/delete/:id',async(req,res)=>{
    const {id} = req.params;
    await pool.query('DELETE FROM marca WHERE id = ?',[id], (err, result) =>{
        if (err) {
            res.json({
                status:"404",
                message:"No se ha eliminado, existe una llave foránea"
            });
        } else {
            res.json({
                status:"200",
                message:"Se ha eliminado correctamente"
            });
        }  
    });
});

module.exports = router;