import { Request } from "@playwright/test";

export default class AuthController {
    private request;

    constructor(request: Request) {
        this.request = request;
    }
    async signInAndGetCookie(email: string, password:string){
        let sidValueGlobal: string = '';
        const response = await this.request.post("/api/auth/signin", {
            data: {
              email: email,
              password: password,
            },
        });

        const sidCookies = response.headers()['set-cookie'];
        const sidValue = sidCookies.split(';')[0].split('=')[1];
        sidValueGlobal = sidValue;

        return sidValueGlobal;
    }
}