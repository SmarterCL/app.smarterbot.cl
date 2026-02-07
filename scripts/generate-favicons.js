const sharp = require('sharp');
const fs = require('fs');

// Asegurarse de que el directorio exista
if (!fs.existsSync('./public/images')) {
  fs.mkdirSync('./public/images', { recursive: true });
}

// Datos del SVG del favicon
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
  <!-- Fondo circular amarillo -->
  <circle cx="50" cy="50" r="45" fill="#FFEB3B"/>
  
  <!-- Rayo negro -->
  <path d="M50 25 L40 50 L50 50 L45 75 L60 50 L50 50 Z" fill="#000000"/>
</svg>`;

const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'favicon-96x96.png', size: 96 },
  { name: 'apple-touch-icon.png', size: 180 }
];

async function generateFavicons() {
  for (const { name, size } of sizes) {
    await sharp(Buffer.from(svgContent))
      .resize(size, size)
      .png()
      .toFile(`./public/images/${name}`);
    
    console.log(`Generated: ${name} (${size}x${size})`);
  }
}

generateFavicons().catch(console.error);