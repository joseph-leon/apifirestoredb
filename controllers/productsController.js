'use strict';
const firebase = require('../db');
const Products = require('../models/products');
const firestore = firebase.firestore();

const addProduct = async (req, res, next) => {
    try {
      const data = req.body;
      const fechaHora = new Date();
      data.fecha = fechaHora.toLocaleDateString();
      data.hora = fechaHora.toLocaleTimeString(); 
  
      const docRef = await firestore.collection('products').add(data);
      res.send('El registro se ha guardado correctamente');
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
  
const getAllProducts = async (req, res, next) => {
    try {
        const products = await firestore.collection('products');
        const data = await products.get();
        const productsArray = [];
        if (data.empty) {
            res.status(404).send('No se ha encontrado ningún registro');
        } else {
            data.forEach(doc => {
                const product = new Products(
                    doc.id,
                    doc.data().nombre,
                    doc.data().descripcion,
                    doc.data().precio,
                    doc.data().barCode,
                    doc.data().cantidad,
                    doc.data().imagenId,
                    doc.data().imagenUrl,
                    doc.data().usuarioId,
                    doc.data().fechaHora
                );
                productsArray.push(product);
            });
            res.send(productsArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        const product = await firestore.collection('products').doc(id);
        const data = await product.get();
        if (!data.exists) {
            res.status(404).send('Producto con el ID dado no encontrado');
        } else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const product = await firestore.collection('products').doc(id);
        await product.update(data);
        res.send('Registro de estudiante actualizado correctamente');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('products').doc(id).delete();
        res.send('Registro eliminado correctamente');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct
}