const User = require("../models/User");
const Product = require("../models/Product");

async function getCart(req, res) {
  try {
    const isRetailer = req.user.role === "retailer";
    const user = await User.findById(req.user._id).populate("cart.product", "name price images stock retailer_price price_bulk min_bulk_qty");
    const items = (user?.cart || []).map(it => {
      const product = it.product;
      let price = product?.price;
      
      // Use bulk pricing for retailers if quantity meets minimum
      if (isRetailer && product) {
        if (it.qty >= product.min_bulk_qty && product.price_bulk) {
          price = product.price_bulk;
        } else if (product.retailer_price) {
          price = product.retailer_price;
        }
      }
      
      return {
        product: product?._id || it.product,
        name: product?.name,
        price: price,
        image: product?.images?.[0]?.url,
        stock: product?.stock,
        qty: it.qty,
        // Include bulk pricing info for retailers
        ...(isRetailer && product ? {
          regularPrice: product.price,
          retailerPrice: product.retailer_price,
          bulkPrice: product.price_bulk,
          minBulkQty: product.min_bulk_qty,
          isBulkPrice: it.qty >= product.min_bulk_qty && product.price_bulk ? true : false
        } : {})
      };
    });
    res.json({ success: true, data: items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

async function addItem(req, res) {
  try {
    const { productId, qty = 1 } = req.body;
    if (!productId) return res.status(400).json({ success: false, message: "productId is required" });
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    if (product.stock <= 0) return res.status(400).json({ success: false, message: "Out of stock" });

    const isRetailer = req.user.role === "retailer";
    const requestedQty = Number(qty) || 1;
    
    // Enforce minimum bulk quantity for retailers if bulk pricing exists
    if (isRetailer && product.min_bulk_qty > 0 && product.price_bulk) {
      if (requestedQty < product.min_bulk_qty) {
        return res.status(400).json({ 
          success: false, 
          message: `Minimum quantity of ${product.min_bulk_qty} required for bulk pricing` 
        });
      }
    }

    const user = await User.findById(req.user._id).select("cart");
    const idx = user.cart.findIndex(i => String(i.product) === String(productId));
    if (idx >= 0) {
      const nextQty = user.cart[idx].qty + requestedQty;
      user.cart[idx].qty = Math.max(1, Math.min(nextQty, product.stock));
    } else {
      user.cart.push({ product: productId, qty: Math.min(requestedQty, product.stock) });
    }
    await user.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

async function updateItem(req, res) {
  try {
    const { productId } = req.params;
    const { qty } = req.body;
    if (!productId) return res.status(400).json({ success: false, message: "productId is required" });
    const product = await Product.findById(productId).select("stock min_bulk_qty price_bulk");
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    
    const isRetailer = req.user.role === "retailer";
    const nextQty = Number(qty);
    
    // Enforce minimum bulk quantity for retailers if bulk pricing exists
    if (isRetailer && product.min_bulk_qty > 0 && product.price_bulk) {
      if (nextQty > 0 && nextQty < product.min_bulk_qty) {
        return res.status(400).json({ 
          success: false, 
          message: `Minimum quantity of ${product.min_bulk_qty} required for bulk pricing` 
        });
      }
    }
    
    const user = await User.findById(req.user._id).select("cart");
    const idx = user.cart.findIndex(i => String(i.product) === String(productId));
    if (idx < 0) return res.status(404).json({ success: false, message: "Item not in cart" });
    
    if (!nextQty || nextQty <= 0) {
      user.cart.splice(idx, 1);
    } else {
      user.cart[idx].qty = Math.min(nextQty, product.stock);
    }
    await user.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

async function removeItem(req, res) {
  try {
    const { productId } = req.params;
    const user = await User.findById(req.user._id).select("cart");
    user.cart = user.cart.filter(i => String(i.product) !== String(productId));
    await user.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

module.exports = { getCart, addItem, updateItem, removeItem };

