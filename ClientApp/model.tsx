export type Game ={
    id:number,
    title:string,
    category:Category,
    price:number,
    platform:Platform,
    description:string,
    image:string
}

export type Category ={
    id:number,
    name:string,
    games:Game[]
}

export type Platform ={
    id:number,
    name:string,
    games:Game[]
}