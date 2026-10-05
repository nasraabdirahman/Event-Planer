import { ObjectId } from "mongodb";
export interface Follow{
  _id? : ObjectId ;
  eventId : ObjectId ;
  userId : ObjectId ;
  notifications : boolean ;
}
