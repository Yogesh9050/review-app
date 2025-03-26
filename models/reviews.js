const db = require('../util/databse');


module.exports = class Review {
    constructor(id, name, pro, con, rating) {
        this.id = id;
        this.name = name;
        this.pro = pro;
        this.con = con;
        this.rating = rating;
    }


    save() {
        return db.execute('INSERT INTO company (name, pro, con, rating) VALUES (?, ?, ?, ?)',
            [this.name, this.pro, this.con, this.rating]
        );
    }

    static fetchAll() {
        return db.execute('SELECT * FROM company');
    }

    static findByName(name) {
        return db.execute(`SELECT * FROM company 
                            WHERE name = ?`, [name])
    }

    static getRating(name) {
        return db.execute(`SELECT AVG(rating) AS Rating FROM company 
            WHERE name = ?`, [name])
    }

}