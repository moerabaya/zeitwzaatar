import { Add, Delete, Remove, ShoppingCart } from "@mui/icons-material";

import {
  AspectRatio,
  Button,
  Input,
  ListDivider,
  ListItem,
  MenuItem,
  Typography,
} from "@mui/joy";
import Box from "@mui/joy/Box";
import Dropdown from "@mui/joy/Dropdown";
import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import React, { useMemo, useState } from "react";

import { useMutation, useQuery } from "@apollo/client";

import { useNavigate } from "react-router-dom";
import {
  ADD_TO_CART,
  GET_ALL_CART_ITEMS,
  REMOVE_FROM_CART,
} from "../../schemas/mutations/cart";

export const Cart = () => {
  const { data, loading } = useQuery(GET_ALL_CART_ITEMS);

  const navigate = useNavigate();
  return (
    <Dropdown>
      <MenuButton
        variant="plain"
        size="sm"
        sx={{
          maxWidth: "32px",
          maxHeight: "32px",
          borderRadius: "9999999px",
        }}
      >
        <ShoppingCart />
      </MenuButton>
      <Menu
        placement="bottom-end"
        size="sm"
        sx={{
          zIndex: "99999",
          minHeight: 200,
          p: 1,
          gap: 1,
        }}
      >
        <MenuItem
          disabled
          xs={{ display: "none" }}
          color={"neutral"}
          style={{
            height: 0,
            padding: 0,
            margin: 0,
            color: "var(--variant-plainColor, rgba(undefined / 1))",
          }}
        >
          Shopping Cart
        </MenuItem>

        <ListDivider />
        {!loading && data?.getAllCartItems?.length ? (
          data?.getAllCartItems.map((item) => <CartItem item={item} />)
        ) : (
          <ListItem sx={{ minHeight: 200, minWidth: 200, textAlign: "center" }}>
            Empty cart
          </ListItem>
        )}
        {!loading && data?.getAllCartItems?.length && (
          <>
            <ListDivider />
            <ListItem>
              <strong>Total:</strong>{" "}
              {new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "EUR",
              }).format(
                data?.getAllCartItems.reduce(
                  (acc, a) => acc + a.quantity * a.price,
                  0
                )
              )}
            </ListItem>
            <Button
              variant="solid"
              color="primary"
              onClick={() => navigate("/checkout")}
            >
              Checkout
            </Button>
          </>
        )}
      </Menu>
    </Dropdown>
  );
};

const CartItem = ({ item }) => {
  const [addToCart] = useMutation(ADD_TO_CART);
  const [removeFromCart] = useMutation(REMOVE_FROM_CART);
  const [value, setValue] = useState(item.quantity);

  const deleteCartItem = (id, quantity = 1) => {
    setValue((value) => value - quantity);
    removeFromCart({
      variables: {
        id,
        quantity,
      },
      refetchQueries: [GET_ALL_CART_ITEMS],
    });
  };

  const addCartItem = (id, quantity = 1) => {
    setValue((value) => value + quantity);
    addToCart({
      variables: {
        id,
        quantity,
      },
    });
  };

  const modifyCartItem = (event, item) => {
    const value = parseInt(event?.target?.value ?? 0) - item.quantity;
    if (value > 0) {
      addToCart({
        variables: {
          id: item.id,
          quantity: value,
        },
      });
    }
    if (value < 0) {
      removeFromCart({
        variables: {
          id: item.id,
          quantity: Math.abs(value),
        },
        refetchQueries: [GET_ALL_CART_ITEMS],
      });
    }
  };

  return (
    <ListItem key={item.id} sx={{ minWidth: 230, alignItems: "flex-start" }}>
      <Box sx={{ flex: "0 0 65px", marginTop: '0.5rem' }}>
        <AspectRatio>
          <img
            component="img"
            src={"https://picsum.photos/300"}
            alt={item.name}
          />
        </AspectRatio>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingInlineStart: '0.5rem' }}>
        <Typography level="h6">{item.category}</Typography>
        <Typography level="h6">{item.name}</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: 'space-between',
            gap: '0.5rem'
          }}
        >
          <IconButton onClick={() => deleteCartItem(item.id)}>
            <Remove />
          </IconButton>
          <Input
            value={value}
            onChange={(event) =>
              setValue(event.target.value ? parseInt(event.target.value) : 0)
            }
            onBlur={(event) => modifyCartItem(event, item)}
            sx={{ width: "50px" }}
          />
          <IconButton onClick={() => addCartItem(item.id)}>
            <Add />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: '0.5rem'
          }}
        >
          <Typography level="h6" sx={{ flex: '1', justifyContent: 'stretch', alignItems: 'stretch' }}>
            {new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "EUR",
            }).format(item.price)}
          </Typography>
          <IconButton onClick={() => removeFromCart(item.id)} size="small">
            <Delete />
          </IconButton>
        </Box>
      </Box>
    </ListItem>
  );
};
