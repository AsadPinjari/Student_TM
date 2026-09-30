const fs = require('fs');

console.log('Starting build...');

if (!fs.existsSync('stm.html')) {
    console.error('BUILD FAILED: stm.html not found');
    process.exit(1);
}

console.log('Build successful: stm.html found');
