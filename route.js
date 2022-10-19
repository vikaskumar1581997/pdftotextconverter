
const express = require('express')
const Book = require('./model')
const pdfparse = require('pdf-parse')
const fs = require('fs')
const multer = require('multer')
const path = require('path')
const router = express.Router()

// Config for multer
// const upload = multer({ dest: "public/files "})
var Storage = multer.diskStorage({
	destination: function (req, file, cb) {
		//cb(null, "../middleware");
		cb(null, path.join(__dirname, "resume"));
	},
	filename: function (req, file, cb) {
		let ext = path.extname(file.originalname);
		cb(null, Date.now() + ext);
	},
});

var upload = multer({
	storage: Storage,
	fileFilter: function (req, file, callback) {
		if (file.mimetype.split('/')[1] === 'pdf' || file.mimetype.split('/')[1] === 'docx') {
			callback(null, true);
		} else {
			console.log("only jpg & png file supported!");
			callback(null, false);
		}
	},
	limits: {
		fileSize: 1024 * 1024 * 1024 * 1024 * 2,
	},
});

router.get('/', (req, res) => {
    res.status(200).render('book.ejs')
})

// router.post("/test",(req,res)=>{
//     return res.status(200).send("done");
//     console.log("done")})


router.post('/bookie', upload.single('file'), async (req, res) => {
     console.log(req.file)
    const pdffile = fs.readFileSync(path.resolve(__dirname, `./resume/${req.file.filename}`))
    pdfparse(pdffile)
    .then((data) => {
        console.log(data.numpages)
        const book = {
            title: req.file.filename,
            textContent: data.text
        }
        Book.create(book)
        .then((cho) => {
            console.log(cho)
            res.status(201).json({
                message: "Book uploaded successfully",
                uploadedBook: {
                    name: cho.title,
                    text: cho.textContent,
                    _id: cho._id
                }
            })
        })
        .catch((e) => {
            // console.log(e)
            res.status(500).json({
                error: e
            })
        })
    }) 
})

module.exports = router
