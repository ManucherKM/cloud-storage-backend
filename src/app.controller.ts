import { All, Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Server check')
@Controller()
export class AppController {
	@All()
	keepAlive() {
		return 'The server is alive.'
	}
}
