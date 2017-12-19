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
    email : string,
    firstname : string,
    lastname : string,
    address : string,
    zipcode : string,
    country : string
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

export type User ={
    id:number,
    email:string,
    password:string,
    firstname:string,
    lastname:string,
    birthdate:Date,
    address:string,
    zipcode:string,
    country:string,
    role:number
}

// export type Order ={
//     id:number,
//     games:Game[]
// }

// export type Wishlist ={
//     id:number,
//     user:User[],
// }