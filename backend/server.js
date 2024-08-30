// // Other required imports
// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const path = require("path");
// const bcrypt = require("bcrypt");
// const bodyParser = require("body-parser");
// const fs = require("fs");
// const multer = require("multer");

// // Import models
// const CartItem = require("./models/CartItem");
// const User = require("./models/User");
// const app = express();
// const port = 3001;

// // Middleware
// app.use(express.json());
// app.use(cors());
// app.use("/static", express.static(path.join(__dirname, "public")));
// app.use(bodyParser.json());

// const productsFilePath = path.join(__dirname, "all_products.jsx");

// // Set up multer for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage });

// // Ensure the uploads directory exists
// if (!fs.existsSync("uploads")) {
//   fs.mkdirSync("uploads");
// }

// // Ensure the all_products.jsx file exists and initialize it if necessary
// if (!fs.existsSync(productsFilePath)) {
//   const initialContent = `let all_product = [];\n\nexport default all_product;`;
//   fs.writeFileSync(productsFilePath, initialContent, "utf8");
// }

// app.post("/products", upload.single("productImage"), (req, res) => {
//   const newProduct = {
//     id: Date.now(),
//     name: req.body.productName,
//     image: req.file ? `/uploads/${req.file.filename}` : "",
//     old_price: parseFloat(req.body.oldPrice),
//     new_price: parseFloat(req.body.newPrice),
//     dealer: req.body.dealer,
//     category: req.body.category,
//   };

//   fs.readFile(productsFilePath, "utf8", (err, data) => {
//     if (err) {
//       console.error("Error reading products file:", err);
//       return res.status(500).send("Error reading products file");
//     }

//     const startIndex = data.indexOf("let all_product = [") + "let all_product = [".length;
//     const endIndex = data.lastIndexOf("];");
//     const productsString = data.slice(startIndex, endIndex).trim();
//     const products = productsString ? JSON.parse(`[${productsString}]`) : [];

//     products.push(newProduct);

//     const newProductsString = JSON.stringify(products, null, 2).slice(1, -1);
//     const newFileContent = `let all_product = [\n${newProductsString}\n];\n\nexport default all_product;`;

//     fs.writeFile(productsFilePath, newFileContent, "utf8", (err) => {
//       if (err) {
//         console.error("Error writing to products file:", err);
//         return res.status(500).send("Error writing to products file");
//       }

//       res.send({ message: "Product added successfully!" });
//     });
//   });
// });

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // MongoDB connection
// mongoose
//   .connect("mongodb://127.0.0.1:27017/carting") // Specify the database name here
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.log("MongoDB connection error:", err));

// // Endpoint to handle user registration
// app.post('/register', async (req, res) => {
//   const { username, email, password, phone } = req.body;

//   if (!username || !email || !password || !phone) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   try {
//     // Check if the user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     // Hash the password before saving to the database
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({ username, email, password: hashedPassword, phone });
//     await user.save();
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     console.error('Error registering user:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// // Endpoint to handle user login
// app.post('/login', async (req, res) => {
//   const { username, password, role } = req.body;

//   if (!username || !password) {
//     return res.status(400).json({ message: 'Username and password are required' });
//   }

//   try {
//     if (role === 'admin') {
//       // Check for admin credentials
//       if (username === 'admin' && password === 'admin123') {
//         return res.status(200).json({ message: 'Admin login successful' });
//       } else {
//         return res.status(400).json({ message: 'Invalid username or password' });
//       }
//     } else {
//       // Check for regular user credentials
//       const user = await User.findOne({ username });
//       if (!user) {
//         return res.status(400).json({ message: 'Invalid username or password' });
//       }

//       const isPasswordValid = await bcrypt.compare(password, user.password);
//       if (!isPasswordValid) {
//         return res.status(400).json({ message: 'Invalid username or password' });
//       }

//       res.status(200).json({ message: 'Login successful', user });
//     }
//   } catch (error) {
//     console.error('Error logging in:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// app.post("/carted", async (req, res) => {
//   const cartItems = req.body.cartItems;
//   console.log("Received POST request to save cart items");
//   console.log("Cart items to be saved:", cartItems); // Log the items to be saved

//   if (!Array.isArray(cartItems) || cartItems.length === 0) {
//     return res.status(400).json({ message: 'Invalid cart items format' });
//   }

//   try {
//     const result = await CartItem.insertMany(cartItems);
//     console.log("Cart items saved to MongoDB", result); // Log the result
//     res.status(200).json({ message: "Cart items saved successfully" });
//   } catch (error) {
//     console.error("Error saving cart items to MongoDB", error);
//     res.status(500).json({ message: "Error saving cart items to MongoDB" });
//   }
// });

// // Endpoint to handle fetching cart items
// app.get("/carted", async (req, res) => {
//   try {
//     const cartItems = await CartItem.find(); // Fetch all cart items
//     res.status(200).json(cartItems);
//   } catch (error) {
//     console.error("Error fetching cart items:", error);
//     res.status(500).json({ message: "Error fetching cart items" });
//   }
// });

// // Endpoint to fetch all users
// app.get("/users", async (req, res) => {
//   try {
//     const users = await User.find({}, 'username email phone'); // Fetch all users, select username and email fields
//     res.status(200).json(users);
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     res.status(500).json({ message: "Error fetching users" });
//   }
// });

// // Endpoint to fetch cart items by dealer
// app.get("/cartitems/:dealer", async (req, res) => {
//   const { dealer } = req.params;
//   try {
//     const cartItems = await CartItem.find({ productDealer: dealer }).sort({ dateAdded: -1 });
//     res.status(200).json(cartItems);
//   } catch (error) {
//     console.error("Error fetching cart items by dealer:", error);
//     res.status(500).json({ message: "Error fetching cart items by dealer" });
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

// Other required imports

/* jshint esversion:6 */
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const fs = require("fs");
const multer = require("multer");

// Import models
const CartItem = require("./models/CartItem");
const User = require("./models/User");
const app = express();
const port = 3001;

// Middleware
app.use(express.json());
app.use(cors());
app.use("/static", express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

const productsFilePath = path.join(__dirname, "all_products.jsx");

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Ensure the uploads directory exists
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// Ensure the all_products.jsx file exists and initialize it if necessary
if (!fs.existsSync(productsFilePath)) {
  const initialContent = `let all_product = [];\n\nexport default all_product;`;
  fs.writeFileSync(productsFilePath, initialContent, "utf8");
}

app.post("/products", upload.single("productImage"), (req, res) => {
  const newProduct = {
    id: Date.now(),
    name: req.body.productName,
    image: req.file ? `/uploads/${req.file.filename}` : "",
    old_price: parseFloat(req.body.oldPrice),
    new_price: parseFloat(req.body.newPrice),
    dealer: req.body.dealer,
    category: req.body.category,
  };

  fs.readFile(productsFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading products file:", err);
      return res.status(500).send("Error reading products file");
    }

    const startIndex =
      data.indexOf("let all_product = [") + "let all_product = [".length;
    const endIndex = data.lastIndexOf("];");
    const productsString = data.slice(startIndex, endIndex).trim();
    const products = productsString ? JSON.parse(`[${productsString}]`) : [];

    products.push(newProduct);

    const newProductsString = JSON.stringify(products, null, 2).slice(1, -1);
    const newFileContent = `let all_product = [\n${newProductsString}\n];\n\nexport default all_product;`;

    fs.writeFile(productsFilePath, newFileContent, "utf8", (err) => {
      if (err) {
        console.error("Error writing to products file:", err);
        return res.status(500).send("Error writing to products file");
      }

      res.send({ message: "Product added successfully!" });
    });
  });
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB connection
const mongoURI =
  // "mongodb+srv://Tharun:Tharun@cluster0.begd0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  "mongodb+srv://Tharun:tharun@cluster0.begd0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Endpoint to handle user registration
app.post("/register", async (req, res) => {
  const { username, email, password, phone } = req.body;

  if (!username || !email || !password || !phone) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword, phone });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Endpoint to handle user login
app.post("/login", async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    if (role === "admin") {
      // Check for admin credentials
      if (username === "admin" && password === "admin123") {
        return res.status(200).json({ message: "Admin login successful" });
      } else {
        return res
          .status(400)
          .json({ message: "Invalid username or password" });
      }
    } else {
      // Check for regular user credentials
      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Invalid username or password" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res
          .status(400)
          .json({ message: "Invalid username or password" });
      }

      res.status(200).json({ message: "Login successful", user });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/carted", async (req, res) => {
  const cartItems = req.body.cartItems;
  console.log("Received POST request to save cart items");
  console.log("Cart items to be saved:", cartItems); // Log the items to be saved

  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return res.status(400).json({ message: "Invalid cart items format" });
  }

  try {
    const result = await CartItem.insertMany(cartItems);
    console.log("Cart items saved to MongoDB", result); // Log the result
    res.status(200).json({ message: "Cart items saved successfully" });
  } catch (error) {
    console.error("Error saving cart items to MongoDB", error);
    res.status(500).json({ message: "Error saving cart items to MongoDB" });
  }
});

// Endpoint to handle fetching cart items
app.get("/carted", async (req, res) => {
  try {
    const cartItems = await CartItem.find(); // Fetch all cart items
    res.status(200).json(cartItems);
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ message: "Error fetching cart items" });
  }
});

// Endpoint to fetch all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "username email phone"); // Fetch all users, select username and email fields
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
});

// Endpoint to fetch cart items by dealer
app.get("/cartitems/:dealer", async (req, res) => {
  const { dealer } = req.params;
  try {
    const cartItems = await CartItem.find({ productDealer: dealer }).sort({
      dateAdded: -1,
    });
    res.status(200).json(cartItems);
  } catch (error) {
    console.error("Error fetching cart items by dealer:", error);
    res.status(500).json({ message: "Error fetching cart items by dealer" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
