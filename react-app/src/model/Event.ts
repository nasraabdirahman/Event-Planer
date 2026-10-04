import { ObjectId } from "mongodb";
export default interface Event{
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