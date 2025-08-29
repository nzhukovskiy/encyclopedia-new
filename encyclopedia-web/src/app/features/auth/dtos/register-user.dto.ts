import {LoginUserDto} from './login-user.dto';

export class RegisterUserDto extends LoginUserDto {
    constructor(email: string, password: string, firstName: string, lastName: string) {
        super(email, password);
        this.firstName = firstName;
        this.lastName = lastName;
    }

    firstName: string;
    lastName: string;
}
