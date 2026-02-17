const multer=require('multer');

const storage=multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const fileName=Date.now() + '-' + file.originalname.replace(/\s+/g,'-').toLowerCase();
        cb(null, fileName);
    }
});

const upload=multer({storage});

module.exports=upload;
