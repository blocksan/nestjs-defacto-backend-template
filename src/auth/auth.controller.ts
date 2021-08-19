import { Controller, UseGuards, Post, Request, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { GoogleAuthGuard } from './google/google-auth.guard';


@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){
        
    }

    @Post('login')
    async login(@Request() req){
        return this.authService.login(req.body);
    }
}
