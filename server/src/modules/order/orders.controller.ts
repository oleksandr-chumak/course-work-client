import {Body, Controller, Get, Post, UseGuards} from "@nestjs/common";
import {AuthGuard} from "../auth/auth.guard";
import {CurrentUser} from "../auth/user.decorator";
import {OrdersService} from "./orders.service";
import {OrderDto} from "./dto/Order.dto";

@Controller('order')
export class OrdersController{
  constructor(private ordersService:OrdersService) {
  }
  @Get("/get/all")
  @UseGuards(AuthGuard)
  getAll(@CurrentUser() user){
    return this.ordersService.getAll(user)
  }
  @Post("/create")
  @UseGuards(AuthGuard)
  create(@CurrentUser() user,@Body() data:OrderDto){
    return this.ordersService.create(user.id,data)
  }
}