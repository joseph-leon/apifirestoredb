const firebase = require("../db");
const firestore = firebase.firestore();
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    //Consigue correo y contraseña de la petición
    const { correo, pass } = req.body;

    //Busca usuario en db usando correo
    const user = await firestore
      .collection("users")
      .where("correo", "==", correo)
      .get();
    if (user.empty) {
      return res
        .status(401)
        .json({ message: "Usuario o contraseña incorrectos" });
    }

    //Primera coincidencia
    const userDoc = user.docs[0];

    //compara contraseñas
    const storedPassword = userDoc.get("pass");
    if (pass !== storedPassword) {
      return res
        .status(401)
        .json({ message: "Usuario o contraseña incorrectos" });
    }

    //Crea token de inico de sesión
    const token = jwt.sign({ uid: userDoc.id }, "secreto", {
      expiresIn: "1h",
    });

    //envía el token al frontend
    return res.json({ token, uid: userDoc.id });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = { login };
