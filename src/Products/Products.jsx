import React from 'react'
import Card from './Card'

const Products = ({products}) => {

  return (
    <div>
        {
            products.map((product)=> <Card  product={product}/>)
        }
    </div>
  )
}

export default Products