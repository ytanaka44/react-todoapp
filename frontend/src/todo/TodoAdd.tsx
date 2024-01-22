import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { FormikTextField } from "../components/FormikTextField";
import SubmitButton from "../components/SubmitButton";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { addTodo } from "./api/api";
import { format } from "date-fns";
import dayjs from "dayjs";
import CloseIcon from "@mui/icons-material/Close";
import { TodoState } from "./types/types";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
});

interface AddTodoProps {
  todos: TodoState[];
  setTodos: React.Dispatch<React.SetStateAction<TodoState[]>>;
}

const AddTodo: React.FC<AddTodoProps> = (props) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
  };

  const handleTodoAdd = () => {
    setOpen(true);
  };

  const formik = useFormik({
    initialValues: {
      id: "",
      title: "",
      description: "",
      done: false,
      important: false,
      date: "",
      createdAt: "",
    },
    validationSchema,
    onSubmit: async (state) => {
      const newId = uuidv4();
      const todo = {
        ...state,
        id: newId,
        createdAt: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
      };
      await addTodo(todo);
      props.setTodos([...props.todos, todo]);
      handleClose();
    },
  });

  return (
    <Box>
      <Button
        startIcon={<AddIcon />}
        variant="contained"
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "flex-start",
          width: "100%",
        }}
        onClick={handleTodoAdd}
      >
        Add a Todo
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Todo</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <form noValidate onSubmit={formik.handleSubmit}>
            <Stack spacing={2}>
              <FormikTextField
                name="title"
                label="Title"
                formik={formik}
                variant="standard"
              />
              <FormikTextField
                name="description"
                label="Description"
                formik={formik}
                variant="standard"
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Deadline"
                  value={null}
                  onChange={(date) => {
                    formik.setFieldValue(
                      "date",
                      dayjs(date).format("YYYY-MM-DD")
                    );
                  }}
                  sx={{ width: "100%", mt: 1 }}
                  slotProps={{
                    textField: {
                      variant: "standard",
                    },
                  }}
                />
              </LocalizationProvider>
            </Stack>
            <SubmitButton name="add" handleClose={handleClose} />
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default AddTodo;
