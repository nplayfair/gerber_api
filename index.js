const restify = require('restify');
const multer = require('multer');
const path = require('path');
const fileProc = require('./convert.js');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'tmp');
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/zip') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 3 },
});

function convert(req, res, next) {
  res.send(`converting ${req.params.image}`);
  next();
}

const server = restify.createServer();

// Routes
server.post('/convert/:image', convert);

server.post('/upload', upload.single('gerber'), (req, res, next) => {
  try {
    // return res.send(201, { message: `File uploaded successfully to ${uploadpath}` });
    fileProc
      .gerberToImage(req.file.path)
      .then((image) => res.send(201, { message: `Image: ${image} created` }))
      .catch((e) => res.status(500, e.message));
    return next();
  } catch (error) {
    return res.send(400, { message: error.message });
  }
});

server.listen(process.env.PORT || 8000, () => {
  console.log(`${server.name} listening at ${server.url}`);
});
