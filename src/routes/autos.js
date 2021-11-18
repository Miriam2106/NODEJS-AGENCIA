const express = require('express');
const router = express.Router();

const pool = require('../database.js');

router.get('/',async(req,res)=>{
    let listAutos = await pool.query('SELECT * FROM autos');
    res.json({
        status:"200",
        message:"Se ha recuperado correctamente",
        listAutos: listAutos
    });
});

router.get('/:id',async(req,res)=>{
    const {id} = req.params;
    let auto = await pool.query('SELECT * FROM autos WHERE id=?',[id]);
    res.json({
        status:"200",
        message:"Se ha recuperado correctamente",
        auto: auto
    });
});

router.post('/create',async(req,res)=>{
    const {nombre, matricula, verificacion, marca} = req.body;
    const dateNow = Date.now();
    const fecha_registro = new Date(dateNow);
    const fecha_actualizacion = new Date(dateNow);
    const estado = 1;

    const auto={
        nombre, matricula, verificacion, fecha_registro, fecha_actualizacion, estado, marca
    };
    await pool.query('INSERT INTO autos set ?', [auto]);
    res.json({
        status:"200",
        message:"Se ha registrado correctamente",
        auto: auto
    });
});

router.post('/update/:id',async(req,res)=>{
    const {id} = req.params;
    const {nombre, matricula, verificacion, marca} = req.body;
    const dateNow = Date.now();
    const fecha_registro = new Date(dateNow);
    const fecha_actualizacion = new Date(dateNow);

    const auto={
        nombre, matricula, verificacion, fecha_registro, fecha_actualizacion, marca
    };
    await pool.query('UPDATE autos SET ? WHERE id = ?',[auto,id]);
    res.json({
        status:"200",
        message:"Se ha actualizado correctamente",
        auto: auto
    });
});

router.post('/delete/:id',async(req,res)=>{
    const {id} = req.params;
    await pool.query('UPDATE autos SET estado = 0 WHERE id = ?',[id]);
    res.json({
        status:"200",
        message:"Se ha desactivado correctamente"
    });
});

module.exports = router;