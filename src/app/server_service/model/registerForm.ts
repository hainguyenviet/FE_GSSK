export class userRegisterForm{
    email!: string
    password!: string
    fullName!: string
    constructor(fullName: string, email: string, password: string)
    {
        this.email = email;
        this.password = password;
        this.fullName = fullName
    }
} 