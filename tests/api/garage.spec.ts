import { test, expect } from "@playwright/test";
import CarsController from "../../pom/api_controllers/CarsController";
import AuthController from "../../pom/api_controllers/authController";

test.describe("Garage API tests with controllers", () => {
    let carsController: CarsController;
    let authController: AuthController;
    let sid;

    test.beforeAll(async ({request}) => {
        authController = new AuthController(request);

        sid = await authController.signInAndGetCookie(process.env.MAIN_USER_EMAIL!, process.env.MAIN_USER_PASSWORD!);
    });

    test.beforeEach(async ({request}) => {
        carsController = new CarsController(request);
        authController = new AuthController(request);
    });

  test("Get all brands [/api/cars/brands]", async ({ request }) => {
    const response = await carsController.getAllBrands();
    const allCars = response.data;
    const carTitle = response.data[3].title;
    expect(allCars).toHaveLength(5);
    expect(carTitle).toEqual("Porsche");
  });

  test("Get user cars [/api/cars]", async ({ request }) => {
    const response = await carsController.getUserCars(sid);
    const allCars = response.data;
    expect(allCars.length).toBeLessThan(5);
  });

  test("Add new Car and check the brandId[/api/cars]", async ({request}) => {
    const body = await carsController.createCar(sid);
    console.log(body);
    expect(body.data.carBrandId).toEqual(1);
  })

  test("Add new Car and check the ModeldId[/api/cars]", async ({request}) => {
    const body = await carsController.createCar(sid);
    console.log(body);
    expect(body.data.carModelId).toEqual(1);
  })

  test("Add new Car and check the image[/api/cars]", async ({request}) => {
    const body = await carsController.createCar(sid);
    console.log(body);
    expect(body.data.logo).toEqual('audi.png');
  })

  test("Add new Car and check the 401 error[/api/cars]", async ({request}) => {
    const body = await carsController.createCar();
    console.log(body);
    expect(body.message).toBe('Not authenticated');
  })

  test("Add new Car and check the 404 error[/api/cars]", async ({request}) => {
    const body = await carsController.createCarWithIncorrectRoute(sid);
    console.log(body);
    expect(body.message).toBe('Not found');
  })

  test("Add new Car and check incorrect model[/api/cars]", async ({request}) => {
    const body = await carsController.createCarWithIncorrectModel(sid);
    console.log(body);
    expect(body.message).toBe('Model not found');
  })

  test("Remove user cars [/api/cars/{id}]", async ({ request }) => {
    const getCarsResponse = await carsController.getUserCars(sid);
    const lastAddedCarId = getCarsResponse.data[0].id
    const deleteCarResponse = await carsController.deleteCarById(lastAddedCarId, sid);
    expect (deleteCarResponse.data.carId).toBe(lastAddedCarId)
  });
});