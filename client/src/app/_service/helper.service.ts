import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn:"root"
})
export class HelperService{
  getImageUrl(url:string){
    return `${environment.apiUrl}/${url}`
  }
  getFormattedPrice(price:number){
    const formattedPrice = price.toString().split("")
      .reduce((previousValue, currentValue, currentIndex, array) =>{
        return currentIndex - array.length % 3 === 0 ? previousValue.concat(` ${currentValue}`) : previousValue.concat(currentValue);
      })
    return formattedPrice;
  }
  shortenString(from:number,to:number,string:string){
    const slicedString = string.slice(from,to);
    if(string.length >= to){
      return `${slicedString}...`;
    }
    return slicedString;
  }
}
