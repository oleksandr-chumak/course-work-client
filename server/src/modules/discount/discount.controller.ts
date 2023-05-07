import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import {DiscountService} from "./discount.service";
import {CreateDiscountDto} from "./dto/create-discount.dto";
import { UpdateDiscountDto } from "./dto/update-discount.dto";

@Controller('discount')
export class DiscountController {

  constructor(private discountService:DiscountService) {
  }
  @Delete("delete/:id")
  delete(@Param("id") id:string){
    return this.discountService.delete(id);
  }
  @Post("create")
  create(@Body() data:CreateDiscountDto){
    console.log(data);
    return this.discountService.create(data);
  }
  @Get("get/byName/:name")
  getByName(@Param("name") name:string){
    return this.discountService.getByName(name)
  }
  @Put("update")
  update(@Body() dto:UpdateDiscountDto){
    return this.discountService.update(dto);
  }
}
