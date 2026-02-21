import db from "../config/db.config.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET 
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN;

export const register = async (data) => {
    const { full_name, email, password, role } = data; 
    
    // check if user already exists
    const checkQuery = 'SELECT * FROM users WHERE email = $1';
    const existingUser = await db.query(checkQuery, [email]);
    
    if (existingUser.rows.length > 0) {
        throw new Error('User with this email already exists');
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `
    INSERT INTO users (full_name, email, password, role)
    VALUES ($1, $2, $3, $4)
    RETURNING id, full_name, email, role, created_at
    `;

    const values = [full_name, email, hashedPassword, role];
    const result = await db.query(query, values);
    
    const user = result.rows[0];
    
    //tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    
    // store refresh token
    await storeRefreshToken(user.id, refreshToken);

    return {
        user: {
            id: user.id,
            full_name: user.full_name,
            email: user.email,
            role: user.role
        },
        accessToken,
        refreshToken
    };
};

export const login = async (credentials) => {
    const { email, password } = credentials;
    
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await db.query(query, [email]);
    
    if (result.rows.length === 0) {
        throw new Error('Invalid email or password');
    }
    
    const user = result.rows[0];
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
        throw new Error('Invalid email or password');
    }
    
    // generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    
    // store refresh token
    await storeRefreshToken(user.id, refreshToken);
    
    return {
        user: {
            id: user.id,
            full_name: user.full_name,
            email: user.email,
            role: user.role
        },
        accessToken,
        refreshToken
    };
};

export const refreshToken = async (token) => {
    try {
        const decoded = jwt.verify(token, JWT_REFRESH_SECRET);
        
        // Check if refresh token exists in database
        const query = 'SELECT * FROM refresh_tokens WHERE user_id = $1 AND token = $2 AND revoked = false';
        const result = await db.query(query, [decoded.userId, token]);
        
        if (result.rows.length === 0) {
            throw new Error('Invalid refresh token');
        }
        
        // Get user data
        const userQuery = 'SELECT * FROM users WHERE id = $1';
        const userResult = await db.query(userQuery, [decoded.userId]);
        
        if (userResult.rows.length === 0) {
            throw new Error('User not found');
        }
        
        const user = userResult.rows[0];
        
        // Generate new tokens
        const accessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);
        
        // Revoke old refresh token and store new one
        await revokeRefreshToken(token);
        await storeRefreshToken(user.id, newRefreshToken);
        
        return {
            accessToken,
            refreshToken: newRefreshToken
        };
    } catch (error) {
        throw new Error('Invalid or expired refresh token');
    }
};

// Helper functions
const generateAccessToken = (user) => {
    return jwt.sign(
        { 
            userId: user.id, 
            email: user.email, 
            role: user.role 
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );
};

const generateRefreshToken = (user) => {
    return jwt.sign(
        { userId: user.id },
        JWT_REFRESH_SECRET,
        { expiresIn: JWT_REFRESH_EXPIRES_IN }
    );
};

const storeRefreshToken = async (userId, token) => {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days from now
    
    const query = `
        INSERT INTO refresh_tokens (user_id, token, expires_at)
        VALUES ($1, $2, $3)
    `;
    
    await db.query(query, [userId, token, expiresAt]);
};

const revokeRefreshToken = async (token) => {
    const query = 'UPDATE refresh_tokens SET revoked = true WHERE token = $1';
    await db.query(query, [token]);
};

export const revokeToken = async (token) => {
    await revokeRefreshToken(token);
    return { message: 'Token revoked successfully' };
};

export const getUserById = async (userId) => {
    const query = 'SELECT id, full_name, email, role, created_at FROM users WHERE id = $1';
    const result = await db.query(query, [userId]);
    
    if (result.rows.length === 0) {
        throw new Error('User not found');
    }
    
    return result.rows[0];
};

export const verifyAccessToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        throw new Error('Invalid or expired access token');
    }
};

