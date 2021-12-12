export interface ratingModel{
    value:number;
    maxValue:number;
    valueChange:(value:number)=>void;
}