import { diskStorage } from 'multer'

const getFileId = () => Math.round(Math.random() * 1e20).toString()

const normalizeFileName = (req, file, callback) => {
	file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8')

	const fileExt = file.originalname.split('.').pop()
	const fileName = `${getFileId()}.${fileExt}`

	callback(null, fileName)
}

export const fileStorage = diskStorage({
	destination: './uploads',
	filename: normalizeFileName,
})
