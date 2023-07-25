import { HttpService } from "./http-service";

async function execute() {
    const httpService = new HttpService('http://date.jsontest.com');
    const response = await httpService.get();
    console.log(response);
}

execute();