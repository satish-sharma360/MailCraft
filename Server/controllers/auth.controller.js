import UserModels from "../Models/User.models.js";
import authService from "../services/auth.service.js";

class AuthController {
    constructor() {
        this.signup = this.signup.bind(this);
        this.login = this.login.bind(this);
        this.refreshToken = this.refreshToken.bind(this);
    }
    async signup(req, res) {
        const { firstName, lastName, email, password, confirmPassword } = req.body;

        // --- Input validation for all required fields ---

        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            return res.status(400).json({ success: false, message: 'All fields (firstname,lastName, email, password) are required.' });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ success: false, message: 'Both Password should be same' });
        }
        try {
            const { accessToken, refreshToken, user } = await authService.signupUser(firstName, lastName, email, password)
            res.cookie('refreshToken', refreshToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true
            });

            res.cookie('accessToken', accessToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: false
            });
            res.status(201).json({ success: true, message: 'User created successfully.', accessToken, user })
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
    async login(req, res) {
        console.log(req.body)
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Both email and password are required.' });
        }
        try {
            const { accessToken, refreshToken, user } = await authService.loginUser(email, password)
            res.cookie('refreshToken', refreshToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true
            });

            res.cookie('accessToken', accessToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: false
            });

            const userObj = user.toObject();
            delete userObj.password;

            res.status(200).json({ success: true, message: 'Login successful.', accessToken, user: userObj });
        } catch (error) {
            res.status(401).json({ success: false, message: error.message });
        }
    }

    async refreshToken(req, res) {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(400).json({ success: false, message: 'Refresh token is required.' });
        }

        try {
            const newAccessToken = await authService.refreshAccessToken(refreshToken)
            res.status(200).json({ success: true, message: "Access Token Generated", accessToken: newAccessToken })
        } catch (error) {
            res.status(401).json({ success: false, message: error.message });
        }

    }

    async getUser(req, res) {
        try {
            const user = await UserModels.findById(req.user.id); // user ID extracted from token
            res.json({ user });
        } catch (error) {
            res.status(401).json({ success: false, message: error.message });
        }
    }
}
export default new AuthController()