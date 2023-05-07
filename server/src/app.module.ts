import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {GoodSchema} from "./modules/good/good.schema";
import {OrderSchema} from "./modules/order/order.schema";
import {GoodsService} from "./modules/good/goods.service";
import {OrdersService} from "./modules/order/orders.service";
import {GoodsController} from "./modules/good/goods.controller";
import {OrdersController} from "./modules/order/orders.controller";
import {GoodsModule} from "./modules/good/goods.module";
import {OrdersModule} from "./modules/order/orders.module";
import {UserService} from "./modules/auth/user.service";
import {AuthService} from './modules/auth/auth.service';
import {AuthModule} from './modules/auth/auth.module';
import {UserModule} from "./modules/auth/user.module";
import {UserSchema} from "./modules/auth/user.schema";
import {JwtModule} from "@nestjs/jwt";
import {TokenService} from "./modules/auth/token.service";
import {ServeStaticModule} from "@nestjs/serve-static";
import {join} from "path";
import {DiscountModule} from './modules/discount/discount.module';
import {DiscountSchema} from "./modules/discount/discount.schema";
import {DiscountController} from "./modules/discount/discount.controller";
import {DiscountService} from "./modules/discount/discount.service";


@Module({

  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/public',
    }),
    MongooseModule.forRoot("mongodb+srv://fafdfsrwea:Q7TDucLvncV8VInP@store-with-one-seller.vhrkjh4.mongodb.net/?retryWrites=true&w=majority"),
    MongooseModule.forFeature([
        {name: "Good", schema: GoodSchema},
        {name: "Order", schema: OrderSchema},
        {name: "User", schema: UserSchema},
        {name: "Discount", schema: DiscountSchema}
      ],
    ),
    GoodsModule,
    OrdersModule,
    AuthModule,
    UserModule,
    JwtModule,
    DiscountModule
  ],
  providers: [GoodsService, OrdersService, UserService, AuthService, TokenService,DiscountService],
  controllers: [GoodsController, OrdersController,DiscountController]
})
export class AppModule {
}
