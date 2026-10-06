import { ObjectId } from "mongodb";
export default interface Follow{
  _id? : ObjectId ;
  eventId : ObjectId ;
  userId : ObjectId ;
  notifications : boolean ;
}
