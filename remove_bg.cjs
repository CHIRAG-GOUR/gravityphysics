const { Jimp } = require('jimp');

async function removeWhite(imagePath, outputPath) {
  try {
    const image = await Jimp.read(imagePath);
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      const red = this.bitmap.data[idx + 0];
      const green = this.bitmap.data[idx + 1];
      const blue = this.bitmap.data[idx + 2];
      
      // If pixel is close to white, make it completely transparent
      if (red > 235 && green > 235 && blue > 235) {
        this.bitmap.data[idx + 3] = 0; // alpha to 0
      }
    });
    await image.write(outputPath);
    console.log(`Processed ${outputPath}`);
  } catch (err) {
    console.error(`Failed on ${imagePath}:`, err);
  }
}

Promise.all([
    removeWhite('public/images/newton.png', 'public/images/newton.png'),
    removeWhite('public/images/apple.png', 'public/images/apple.png')
]).then(() => console.log('All images processed successfully!'));
