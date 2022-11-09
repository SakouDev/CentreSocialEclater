export const DBlogs = {
    dialect: process.env.DB_DIALECT || "postgres",
    user: process.env.DB_USERNAME || "postgres",
    host: process.env.DB_HOSTNAME || "localhost",
    database: process.env.DB_DATABASE || "TestForVincent",
    password: process.env.DB_PASSWORD || "12344",
    port: process.env.DB_PORT || 5432,
}