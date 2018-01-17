export type Game ={
    id:number,
    title:string,
    category:Category,
    price:number,
    platform:Platform,
    description:string,
    releasedate:number,
    publisher:string,
    image:string
}

export type ShoppingcartGame ={
    id:number,
    title:string,
    category:Category,
    price:number,
    platform:Platform,
    description:string,
    releasedate:number,
    publisher:string,
    image:string,
    amount:number
}

export type ShippingInfo ={
    id : null,
    email : string,
    firstname : string,
    lastname : string,
    address : string,
    city : string,
    zipcode : string,
    country : string
}

export type Category ={
    id:number,
    name:string
}

export type Platform ={
    id:number,
    name:string
}

export type User ={
    id:number,
    email:string,
    password:string,
    firstname:string,
    lastname:string,
    birthdate:Date,
    address:string,
    city:string,
    zipcode:string,
    country:string,
    role:number
}

export type Order ={
    id : number,
    orderDate : Date,
    paymentMethod : string,
    methodInfo : string,
    status : string,
    orderItems : OrderItem[],
    total : number
}

export type OrderItem={
    id: number,
    gameId: number,
    game : Game,
    quantity : number
}

export type Wishlist={
    id : number,
    game : Game
}