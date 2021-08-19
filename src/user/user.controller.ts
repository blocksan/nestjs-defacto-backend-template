import { Controller, Post, Inject, Body, Request, UseGuards, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';

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
        return this.userService.saveUser(user)
    }

    @UseGuards(JwtAuthGuard)
    @Get('isAuthenticated')
    async isAuthenticated(@Request() req){
        return req.user
    }



}
