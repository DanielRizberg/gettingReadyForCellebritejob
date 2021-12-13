import { movieImdbData } from "./movieExtraData";

export interface movieDetailModel{
    data:movieImdbData;
    show:boolean;
    handleClose:()=>void;
    id:number;
}