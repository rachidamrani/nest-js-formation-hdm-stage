import { Controller, Get } from "@nestjs/common";

@Controller("/api")
export class AppController {
  @Get("/oskok")
  getRootRoute() {
    return {
      message: "Hello Nest!",
    };
  }
}
