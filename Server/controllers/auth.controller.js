import authService from "../services/auth.service.js";

class AuthController {
    constructor(){
        this.signup = this.signup.bind(this);
        this.login = this.login.bind(this);
        this.refreshToken = this.refreshToken.bind(this);
    }
    async signup(req, res) {
        const { name, email, password, confirmPassword } = req.body;

        // --- Input validation for all required fields ---

        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({ success: false, message: 'All fields (name, email, password) are required.' });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ success: false, message: 'Both Password should be same' });
        }

        try {
            const { accessToken, refreshToken, user } = await authService.signupUser(name, email, password)
            res.cookie("refreshToken" , refreshToken,{
                httpOnly:true,
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            res.status(201).json({ success: true, message: 'User created successfully.', accessToken, user })
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
    async login(req, res) {
        const { email, password } = req.body;
        // --- Input validation for email and password ---
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Both email and password are required.' });
        }
        try {
            const { accessToken, refreshToken, user } = await authService.loginUser(email, password)
            res.cookie("refreshToken" , refreshToken,{
                httpOnly:true,
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            res.status(200).json({ success: true, message: 'Login successful.', accessToken, user });
        } catch (error) {
            res.status(401).json({success: false, message: error.message });
        }
    }

    async refreshToken(req, res) {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(400).json({ success: false, message: 'Refresh token is required.' });
        }

        try {
            const newAccessToken = await authService.refreshAccessToken(refreshToken)
            res.status(200).json({ success: true, message: "Access Token Generated", accessToken: newAccessToken })
        } catch (error) {
            res.status(401).json({success: false, message: error.message });
        }

    }
}
export default new AuthController()