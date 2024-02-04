import { Snackbar } from "@mui/joy";
import React, { createContext, useContext, useEffect, useId } from "react";

const SnackbarContext = createContext({});
export const SnackbarProvider = ({ children }) => {
  const [snackbars, setSnackbars] = React.useState([]);

  const push = (args) => setSnackbars((snackbars) => [...snackbars, args]);
  const remove = (id) =>
    setSnackbars((snackbars) => snackbars.filter((item) => item.id === id));
  const show = ({ id, timeout = 3000, ...args }) => {
    setSnackbars((snackbars) =>
      snackbars?.map((item) =>
        item.id === id ? { ...item, open: true, ...args } : item
      )
    );

    if (timeout) setTimeout(() => hide(id), timeout);
  };
  const hide = (id) =>
    setSnackbars((snackbars) =>
      snackbars?.map((item) =>
        item.id === id ? { ...item, open: false } : item
      )
    );

  return (
    <SnackbarContext.Provider value={{ push, remove, show, hide }}>
      {children}
      {snackbars?.map((item) => {
        return (
          <Snackbar
            variant={item.variant}
            color={item.color}
            open={item.open}
            key={item.id}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            {item.message}
          </Snackbar>
        );
      })}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = ({
  message = "",
  defaultOpen = false,
  timeout = 3000,
  ...args
} = {}) => {
  const id = useId();
  const {
    push,
    remove,
    show: showSnackbar,
    hide: hideSnackbar,
  } = useContext(SnackbarContext);
  useEffect(() => {
    push({
      id,
      message,
      open: defaultOpen,
      ...args,
    });

    return () => {
      remove(id);
    };
  }, []);

  const show = (msg = message) => showSnackbar({ id, timeout, message: msg });
  const showError = (msg = message) =>
    showSnackbar({ id, timeout, color: "danger", message: msg });
  const hide = () => hideSnackbar(id);

  return {
    show,
    showError,
    hide,
  };
};
