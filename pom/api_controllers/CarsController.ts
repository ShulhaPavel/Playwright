import { Request } from "@playwright/test";

export default class CarsController {
    private request;

    constructor(request: Request) {
        this.request = request;
    }
    
    async getUserCars(cookies: string){
        const response = await this.request.get("/api/cars", {
            headers:{
                'Cookie': `sid=${cookies}`
            }
        });

        return await response.json();
    }

    async getAllBrands(){
        const response = await this.request.get("/api/cars/brands");
        return await response.json();
    }

    async getAllmodels(){
        const response = await this.request.get("/api/cars/models");
        return await response.json();
    }

    async deleteCarById(id: number, cookies: string){
        const response = await this.request.delete(`/api/cars/${id}`,{
            headers:{
                'Cookie': `sid=${cookies}`
            }
        });
        return await response.json();
    }

    async createCar(cookies:string){
        const response = await this.request.post('/api/cars', {
            headers:{
                'Cookie': `sid=${cookies}`
            },
            data: {
                    "carBrandId": 1,
                    "carModelId": 1,
                    "mileage": 1488
            }
        });

        return await response.json();
    }

    async createCarWithIncorrectRoute(cookies:string){
        const response = await this.request.post('/api/carssss', {
            headers:{
                'Cookie': `sid=${cookies}`
            },
            data: {
                    "carBrandId": 1,
                    "carModelId": 1,
                    "mileage": 1488
            }
        });

        return await response.json();
    }

    async createCarWithIncorrectModel(cookies:string){
        const response = await this.request.post('/api/cars', {
            headers:{
                'Cookie': `sid=${cookies}`
            },
            data: {
                    "carBrandId": 1,
                    "carModelId": 10,
                    "mileage": 1111
            }
        });

        return await response.json();
    }

}