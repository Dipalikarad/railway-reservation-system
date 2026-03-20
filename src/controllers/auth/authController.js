const User = require('../../model/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    try {
    const { userName, email, password, phone, role } = req.body;  

    // Validate required fields
    if (!userName || !email || !password) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = new User({
        userName,
        email,
        password: hash,
        phone: phone || undefined,
        role: role || 'staff'
    })

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if(!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        };

        const isMatch = await bcrypt.compare(password, user.password);


        if(isMatch) {
           const token = jwt.sign(
            { userId: user._id, role: user.role },
           "gtbsystem123",
            { expiresIn: '1h' }
           )

            // Store JWT in cookie so server-rendered EJS pages (/dashboard, /profile, etc.)
            // can authenticate without needing an Authorization header.
            res.cookie('token', token, {
                httpOnly: true,
                sameSite: 'lax',
                maxAge: 60 * 60 * 1000, // 1 hour
                path: '/',
            });

            res.status(200).json({ 
                message: 'Login successful', 
                token, 
                user: { 
                    id: user._id, 
                    name: user.userName, 
                    email: user.email, 
                    role: user.role 
                } 
            });
        } else {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};