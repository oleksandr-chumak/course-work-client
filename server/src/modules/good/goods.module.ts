import {Module} from "@nestjs/common";
import {GoodsService } from "./goods.service";
import {GoodsController } from "./goods.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { GoodSchema } from "./good.schema";

@Module({
  imports:[MongooseModule.forFeature([{name:"Good",schema:GoodSchema}])],
  providers:[GoodsService],
  controllers:[GoodsController]
})
export class GoodsModule{}