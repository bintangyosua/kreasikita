import { randomInt } from 'crypto';
import { diskStorage } from 'multer';
import path = require('path');

export const PfpStore =  {
    storage: diskStorage({
        destination: './images/pfp',
        filename: (req, file, cb) => {
            const fileExtension:string = path.extname(file.originalname);
            const currentDate = new Date();
            const day = currentDate.getDate().toString().padStart(2, '0');
            const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
            const year = currentDate.getFullYear().toString();
            const currentDateTime = `${day}-${month}-${year}`;
            const randomId = randomInt(1000);
            const filename:string = `pfp-${currentDateTime}-${randomId}${fileExtension}`;
            cb(null, filename);
        }
    })
}

export const BannerStore =  {
    storage: diskStorage({
        destination: './images/banner',
        filename: (req, file, cb) => {
            const fileExtension:string = path.extname(file.originalname);
            const currentDate = new Date();
            const day = currentDate.getDate().toString().padStart(2, '0');
            const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
            const year = currentDate.getFullYear().toString();
            const currentDateTime = `${day}-${month}-${year}`;
            const randomId = randomInt(1000);
            const filename:string = `banner-${currentDateTime}-${randomId}${fileExtension}`;
            cb(null, filename);
        }
    })
}