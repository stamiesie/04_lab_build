const pool = require ('../utils/pool');

module.exports = class Recipe {
    id;
    title;
    ingredients;
    thumbnail;
    
    constructor(row) {
        this.id = row.id;
        this.title = row.title;
        this.ingredients = row.ingredients;
        this.thumbnail = row.thumbnail;
    }

    static async insert(recipe) {
        const {
            rows
        } = await pool.query(`
        INSERT INTO recipes (title, ingredients, thumbnail) VALUES ($1, $2, $3) RETURNING *
        `,
        [
            recipe.title,
            recipe.ingredients,
            recipe.thumbnail

        ]);

        return new Recipe(rows[0])
    }
    static async findById(id) {
        const {
            rows
        } = await pool.query(`
        SELECT * FROM recipes WHERE id = $1
        `,
        
            [id]
        )

        return new Recipe(rows[0])
    }

    static async updateTitle(title, id) {
        const {
          rows,
        } = await pool.query(
          'UPDATE recipes SET title = $1 WHERE id = $2 RETURNING *',
          [
            title,
            id
          ]
        );
        return new Recipe(rows[0])
}

    static async deleteRecipe(id) {
        const {
            rows,
        } = await pool.query(
            'DELETE FROM recipes WHERE id = $1 RETURNING *',
            [id]
        );

        return new Recipe(rows[0])
    }
}