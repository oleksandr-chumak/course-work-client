import { Body, Controller, Delete, Get, Param, Post, Put, Req, UploadedFile, UseInterceptors } from "@nestjs/common";
import {GoodsService } from "./goods.service";
import {FileInterceptor} from "@nestjs/platform-express";
import { diskStorage } from 'multer';
import { UpdateCountDto } from "./dto/update-count.dto";
const { uuid } = require('uuidv4');

@Controller("/goods")
export class GoodsController {
  constructor(private readonly goodsService: GoodsService) {
  }

  @Get("/get/one/:id")
  async getOne(@Param("id") id) {
    return await this.goodsService.getGood(id);
  }
  @Get("/get/all")
  async getAll(){
    return await this.goodsService.getAll();
  }
  @Put("/update/count/one")
  updateCountOne(@Body() data:UpdateCountDto){
    return this.goodsService.updateGoodCount(data.amount,data.id)
  }

  @Get("get/byName/:name")
  async getGoodsByName(@Param("name") name:string){
    return this.goodsService.findGoodsByName(name);
  }
  @Post("create")
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './public/images',
      filename: (req, file, callback) => {
        const fileExtName = file.originalname.split('.')[1];
        const randomName = uuid();
        callback(null, `${randomName}.${fileExtName}`);
      },
    }),
  }))
  async createProduct(
    @UploadedFile() file,
    @Body('name') name: string,
    @Body('unit') unit: string,
    @Body('price') price: number,
    @Body('totalAmount') totalAmount: number,
  ) {
    const data = {
      name,
      unit,
      price,
      totalAmount,
      imageUrl:file.path
    }
    console.log(data)
    return this.goodsService.createGood(data);
  }


  @Get("/inventory")
  async InventoryOfRemains(){
    return await this.goodsService.inventory()
  }

  @Delete("/delete/:id")
  async deleteGood(@Param("id") id:string){
    return this.goodsService.deleteGood(id);
  }
}
