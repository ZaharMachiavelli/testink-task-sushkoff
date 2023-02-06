export interface IProduct {
    id: number,
    price: number,
    title: string,
  }
  
export  interface IProductItem {
    product: IProduct,
    count: number,
  }