import { pool } from "../config/db";

export type User = {
  id?: number;
  name: string;
  email: string;
  password: string;
};

export async function createUser(user: User): Promise<User> {
  const result = await pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
    [user.name, user.email, user.password]
  );
  return result.rows[0];
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const result = await pool.query("SELECT * FROM users WHERE email = $1 LIMIT 1", [email]);
  return result.rows.length > 0 ? result.rows[0] : null;
}
