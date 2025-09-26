const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

// Parse URL-encoded data (from forms)
app.use(bodyParser.urlencoded({ extended: false }));

// Make 'public' folder accessible
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/admin', adminData.routes);
app.use(shopRoutes);

// 404 Page
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

// Listen on port 3000 on all network interfaces
const PORT = 3000;
app.listen(PORT, '0.0.0.0', (err) => {
    if (err) {
        console.error('Failed to start server:', err);
    } else {
        console.log(`Server is running and accessible at http://<EC2_PUBLIC_IP>:${PORT}`);
    }
});

