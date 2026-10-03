import { ObjectId } from "mongodb";
export default interface EventDB{
  _id? : ObjectId ;
  userId : ObjectId ;
  location : string ;
  price : number ;
  description : string ;
  followerCount : number ;
  title : string ;
  startTimeDate : Date ;
  endTimeDate : Date
}