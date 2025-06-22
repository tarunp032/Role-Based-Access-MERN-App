const Product = require("../model/productModel");
const nodemailer = require("nodemailer");

exports.productCreate = async (req, res) => {
  try {
    const uid = req.userDetail._id;
    const email = req.userDetail.email;
    const { name, type, price } = req.body;

    if (!name || !type || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newProduct = new Product({
      name,
      type,
      price,
      user_id: uid,
    });

    await newProduct.save();

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "youremailid@gmail.com",
        pass: "", // Use App password only
      },
    });

    await transporter.sendMail({
      from: "youremailid@gmail.com",
      to: email,
      subject: "Product Created",
      text: `Product has been successfully added.\n\nDetails:\nName: ${name}\nType: ${type}\nPrice: ₹${price}`,
    });

    return res.status(200).json({ message: "Product created", product: newProduct });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.productGet = async (req, res) => {
  try {
    const role = req.userDetail.role;

    if (role === "Admin") {
      const data = await Product.find().populate("user_id");
      return res.status(200).json(data);
    }

    if (role === "Client") {
      const data = await Product.find().limit(4);
      return res.status(200).json(data);
    }

    if (role === "User") {
      const data = await Product.find({ user_id: req.userDetail._id });
      return res.status(200).json(data);
    }

    return res.status(403).json({ message: "Unauthorized role" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};