import { Controller, Post, Inject, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';

@Controller('user')
export class UserController {

    @Inject()
    private userService: UserService

    @Post('dummy')
    async saveDummyUsers(){
        await this.userService.saveTempUsers()
    }

    @Post('signup')
    async registerUser(@Body() user: UserDto){
        await this.userService.saveUser(user)
    }

}
