import { All, Controller } from '@nestjs/common'

@Controller()
export class AppController {
	@All()
	keepAlive() {
		return true
	}
}
