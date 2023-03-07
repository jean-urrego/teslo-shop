import React, { FC } from 'react'
import NextLink from 'next/link';
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';

import { ItemCounter } from '@components/ui';
import { useCart } from '@Context';
import { ICartProduct } from '@Interfaces';

interface Props {
  editable: boolean;
}

export const CartList:FC<Props> = ({ editable }) => {

  const { cart, updateCartQuantity, removeCartProduct } = useCart();

  const onNewCartQuantityValue = ( product: ICartProduct, newQuantityValue: number ) => {
    product.quantity = newQuantityValue;
    updateCartQuantity( product );
  }

  return (
    <>
        {
            cart!.map(product => (
                <Grid container spacing={2} key={ product.slug + product.size } sx={{ mb:1 }}>

                  <Grid item xs={3}>
                    <NextLink href={`/product/${product.slug}`} passHref legacyBehavior>
                      <Link>
                        <CardActionArea>
                          <CardMedia 
                            image={`/products/${ product.image }`}
                            component='img'
                            sx={{borderRadius: '5'}}
                          />
                        </CardActionArea>
                      </Link>
                    </NextLink>
                  </Grid>
                  
                  <Grid item xs={7}>
                    <Box display='flex' flexDirection='column'>
                      <Typography variant='body1'>{ product.title }</Typography>
                      <Typography variant='body2'>Talla: <strong>{ product.size }</strong></Typography>

                      {
                        editable
                        ? (
                            <ItemCounter
                              currenValue={ product.quantity }
                              maxValue={ 10 }
                              updateQuantity={ (value) => onNewCartQuantityValue( product, value )}
                            />
                          )
                        : (
                          <Typography variant='h5'>{ product.quantity } { product.quantity > 1 ? 'Productos' : 'Producto'}</Typography>
                        )
                      }
                      
                    </Box>
                  </Grid>

                  <Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
                    <Typography variant='subtitle1'>{ `$${ product.price }` }</Typography>
                    {/*Editable */}
                    {
                      editable && <Button variant='text' color='secondary' onClick={ () => removeCartProduct(product)} >Remover</Button>
                    }
                    
                  </Grid>
                </Grid>
            ))
        }
    </>
  )
}
