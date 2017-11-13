export type Game ={
    id:number,
    title:string,
    category:Category,
    price:number,
    platform:Platform,
    description:string
}

export type Category ={
    id:number,
    name:string
}

export type Platform ={
    id:number,
    name:string
}