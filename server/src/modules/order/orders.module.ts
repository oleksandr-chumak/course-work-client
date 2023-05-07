import {Module} from "@nestjs/common";
import {OrdersService } from "./orders.service";
import {OrdersController} from "./orders.controller";
import {AuthGuard} from "../auth/auth.guard";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "../../constants/jwtConstants.";
import {UserModule} from "../auth/user.module";
import {GoodsService} from "../good/goods.service";
import {MongooseModule} from "@nestjs/mongoose";
import {GoodSchema} from "../good/good.schema";
import {OrderSchema} from "./order.schema";

@Module({
  providers:[OrdersService,AuthGuard,GoodsService],
  controllers:[OrdersController],
  imports:[
    MongooseModule.forFeature([{name:"Good",schema:GoodSchema},{name:"Order",schema:OrderSchema}]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '60s' },
      }),
    }),
  ]
})
export class OrdersModule{

}