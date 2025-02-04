import { test, expect } from "@playwright/test";
import { USERS } from "../../test-data/creds/users";

test.describe("API tests", () => {
  test.beforeEach(async () => {});

  test("Get all brands [/api/cars/brands]", async ({ request }) => {
    const response = await request.get("/api/cars/brands");
    const body = await response.json();
    console.log(response);
    console.log("----------------------");
    console.log(body);
    console.log("----------------------");

    const allCars = body.data;
    const carTitle = allCars[3].title;

    expect(allCars).toHaveLength(5);
    expect(carTitle).toEqual("Porsche");
  });

  test("Login with POST [/api/auth/signin]", async ({ request }) => {
    const response = await request.post("/api/auth/signin", {
      data: {
        email: process.env.MAIN_USER_EMAIL!,
        password: process.env.MAIN_USER_PASSWORD!,
      },
    });
    const body = await response.json();
    console.log(body);
    expect(body.data.userId).toBeDefined();
  });
});

test.describe('API with auth in beforeEach', async() => {
    test.beforeEach(async({request}) => {
        const response = await request.post("/api/auth/signin", {
            data: {
              email: process.env.MAIN_USER_EMAIL!,
              password: process.env.MAIN_USER_PASSWORD!,
            },
          });
    })

    test("Get all cars [/api/cars]", async ({ request }) => {
        console.log('-----------MY_STORAGE_STATE-------------')
        console.log(await request.storageState());
        const response = await request.get("/api/cars");
        const body = await response.json();
        console.log('-----------------BODY------------------');
        console.log(body);

        expect(body.data.length).toBeLessThan(5);
     
      });
})

test.describe('API with auth in beforeAll', async() => {
    let sid;
    test.beforeAll(async({request}) => {
        const response = await request.post("/api/auth/signin", {
            data: {
              email: process.env.MAIN_USER_EMAIL!,
              password: process.env.MAIN_USER_PASSWORD!,
            },
        });

        const sidCookies = response.headers()['set-cookie'];
        const sidValue = sidCookies.split(';')[0].split('=')[1];
        sid = sidValue;
    })

    test("Get all cars [/api/cars]", async ({ request }) => {
        console.log('-----------MY_STORAGE_STATE-------------')
        console.log(await request.storageState());
     
        const response = await request.get("/api/cars", {
            headers:{
                'Cookie': `sid=${sid}`
            }
        });
        const body = await response.json();
        console.log('-----------------BODY------------------');
        console.log(body);

        expect(body.data.length).toBeLessThan(5);
     
      });
})