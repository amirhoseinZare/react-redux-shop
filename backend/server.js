const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const fs = require('fs')
const path = require('path')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// general upload API (for test)
server.post('/upload', upload.single('image'), function (req, res, next) {
  // req.file is the `image` file
  // req.body will hold the text fields, if there were any
  res.json(req.file)
})

// list all files API (for test)
server.get('/files', (req, res, next) => {
  fs.readdir('./uploads/', (err, files) => {
    if (err) return next(err)
    res.json(files)
  })
})

// download (preview) a file API
server.get('/files/:file_id', (req, res, next) => {
  const { file_id } = req.params
  res.set('Content-Type', 'image/jpeg')
  res.sendFile(path.join(__dirname, 'uploads/'+file_id))
})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)


// For all non-json POST requests (object creation endpoints using an image file)
// 1- Upload the file inside the `image` field
// 2- (do it in next middleware)
const imageFieldUploadMiddleware = upload.single('image')
server.use((req, res, next) => {
  if (req.method === 'POST' && req.headers['content-type'] != 'application/json') {
    imageFieldUploadMiddleware(req, res, next)
  } else {
    next()
  }
})
server.use((req, res, next) => {
  if (req.method === 'PATCH' && req.headers['content-type'] != 'application/json') {
    imageFieldUploadMiddleware(req, res, next)
  } else {
    next()
  }
})


// If previous middle-ware worked, continue to next step
// 1- (previous middle-ware already did first step)
// 2- Validate uploaded file, and replace the `image` field value with the file path
server.use((req, res, next) => {
  // if there was a file uploaded and previous middleware worked:
  //   req.file is the `image` file
  //   req.body will hold the text fields, if there were any
  if (req.file) {
    const { mimetype, size, filename } = req.file

    // validate uploaded image
    if (mimetype != 'image/jpeg') throw new Error('image should be in image/jpeg type')
    if (size > 2*1024*1024) throw new Error('image size should be less than 2MB')
    
    // Replace image field value with the file's path
    req.body.image = '/files/'+filename
  }
  // continue to normal json-server router for actual creation
  next()
})


// Add createdAt field with timestamp value when posting to any route
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  // Continue to JSON Server router
  next()
})

// Use default router (CRUDs of db.json)
server.use(router)

server.listen(3001, () => {
  console.log('Customized JSON-Server is running at http://localhost:3001/')
})