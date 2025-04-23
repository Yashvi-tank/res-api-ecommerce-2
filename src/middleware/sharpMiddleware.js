const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

/**
 * Middleware to process and compress images using Sharp.
 * @param {string} outputFormat - The desired output format (e.g., "webp", "jpeg", "png").
 * @param {number} quality - The quality of the output image (0-100).
 * @returns {Function} - Express middleware function.
 */
const sharpMiddleware = (outputFormat = "webp", quality = 80) => {
  return async (req, res, next) => {
    if (!req.file) {
      return next();
    }
    try {
      console.log('Processing file:', req.file);
      const inputPath = req.file.path;
      const filename = path.parse(req.file.filename).name;
      const outputDir = path.join(__dirname, "../../uploads");

      
      fs.mkdirSync(outputDir, { recursive: true });

      const outputPath = path.join(outputDir, `${filename}.${outputFormat}`);
      console.log('Input path:', inputPath);
      console.log('Output path:', outputPath);

      await sharp(inputPath)
        .resize(800)
        .toFormat(outputFormat, { quality })
        .toFile(outputPath);

      console.log('Image processed successfully');

      
      if (inputPath !== outputPath) {
        fs.unlinkSync(inputPath);
        console.log('Original file deleted');
      }

 
      req.file.filename = `${filename}.${outputFormat}`;
      req.file.path = outputPath;
      req.file.mimetype = `image/${outputFormat}`;

      console.log('Updated file info:', req.file);
      next();
    } catch (error) {
      console.error("Sharp middleware error:", error);
      
      next(error);
    }
  };
};

module.exports = sharpMiddleware;