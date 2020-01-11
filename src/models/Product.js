const connection = require('../configs/db')

module.exports = {
    getProductCount: () => {
        return new Promise ((resolve, reject) => {
            const query = `SELECT COUNT(*) total from products`
            connection.query(query, (error, result) => {
                if(error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },
    getAll: (offset, limit, sort, sortBy, search) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT a.*, b.*
            FROM products a, photo_product b
            WHERE a.name LIKE '%${search}%'
            AND a.id = b.product_id
            ORDER BY ${a.sortBy} ${sort} LIMIT ${offset}, ${limit}`
            connection.query(query, (error, result) => {
                if (error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },
    addProduct: (name, unit, price, stock, description, category_id, user_id) => {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO products (name, unit, price, stock, description, category_id, user_id)
            VALUES ('${name}', '${unit}', '${price}', '${stock}', '${description}', '${category_id}', '${user_id}')`
            connection.query(query, (error, result) => {
                if(error) {
                    reject(new Error(error))
                }
                else {
                    resolve(result)
                }
            })
        })
    },
    addProductPhoto: (product_id, photo) => {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO photo_product (photo, product_id)
                            VALUES ('${photo}', '${product_id}')`
            connection.query(query, (error, result) => {
                if(error) {
                    reject(new Error(error))
                }
                else {
                    resolve(result)
                }
            })
        })
    },
    updateProduct: (product_id, name, unit, price, stock, description, category_id, user_id) => {
        return new Promise((resolve, reject) => {
            const query =  `UPDATE products SET
            name = '${name}',
            unit = '${unit}',
            price = '${price}',
            stock = '${stock}',
            description = '${description}',
            category_id = '${category_id}',
            user_id = '${user_id}'
            WHERE id = '${product_id}'`

            connection.query(query, (error, result) => {
                if(error) {
                    reject(new Error(error))
                }
                else {
                    resolve(result)
                }
            })
        })
    },
    updateProductPhoto: (product_id, photo) => {
        return new Promise((resolve, reject) => {
            const query = `UPDATE photo_product SET photo = '${photo}' WHERE product_id = '${product_id}'`
            connection.query(query, (error, result) => {
                if(error) {
                    reject(new Error(error))
                }
                else {
                    resolve(result)
                }
            })
        })
    },
    getSingleProduct: (product_id) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM products WHERE id = '${product_id}'`
            connection.query(query, (error, result) => {
                if(error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },
    deleteProduct: (product_id) => {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM products WHERE id = '${product_id}'`
            connection.query(query, (error, result) => {
                if(error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },
    getCart: () => {
        return new Promise((resolve, reject) => {
            const query =  `SELECT a.*, b.* FROM products a INNER JOIN cart b ON a.id = b.product_id AND b.user_id = a.user_id`
            connection.query(query, (error, result) => {
                if(error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },
    getCartByUserId: (user_id) => {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM cart WHERE user_id = '${user_id}'`
            connection.query(query, (error, result) => {
                if(error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },
    addCart: (unit_price, qty, total, product_id, user_id) => {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO cart (unit_price, qty, total, product_id, user_id) VALUES ('${unit_price}', '${qty}', '${total}', '${product_id}', '${user_id}')`
            connection.query(query, (error, result) => {
                if (error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },
    deleteCart: (cart_id) => {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM cart WHERE id = '${cart_id}'`
            connection.query(query, (error, result) => {
                if(error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },
    updateCart: (cart_id, unit_price, qty, total, product_id, user_id) => {
        return new Promise((resolve, reject) => {
            const query =  `UPDATE cart SET
                            unit_price = '${unit_price}',
                            qty = '${qty}',
                            total = '${total}'
                            product_id = '${product_id}'
                            user_id = '${user_id}'
                            WHERE id = '${cart_id}'`
            connection.query(query, (error, result) => {
                if(error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },
    addWishlist: (product_id, user_id) => {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO wishlist (product_id, user_id)
                            VALUES ('${product_id}', '${user_id}')`
            connection.query(query, (error, result) => {
                if(error) {
                    reject(new Error(error))
                }
                else {
                    resolve(result)
                }
            })
        })
    },
    getWishlist: () => {
        return new Promise((resolve, reject) => {
            const query = `SELECT a.*, b.* FROM
            products a INNER JOIN
            wishlist b ON a.id = b.product_id
            AND a.user_id  = b.user_id`
            connection.query(query, (error, result) => {
                if(error) {
                    reject(new Error(error))
                } else {
                    resolve(result)
                }
            })
        })
    },
    deleteWishlist: (product_id, user_id) => {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM wishlist WHERE product_id = '${product_id}' and user_id = '${user_id}'`
            connection.query(query, (error, result) => {
                if(error) {
                    reject(new Error(error))
                }
                else {
                    resolve(result)
                }
            })
        })
    }
}
