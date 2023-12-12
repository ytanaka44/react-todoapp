import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import CustomTextField from "../components/CustomTextField";
import SubmitButton from "../components/SubmitButton";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { addTodo } from "./api/api";
import { format } from "date-fns";
import dayjs from "dayjs";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
});

interface AddTodoProps {
  fetchTodos: () => void;
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
      id: uuidv4(),
      title: "",
      description: "",
      done: false,
      important: false,
      date: "",
      createdAt: "",
    },
    validationSchema,
    onSubmit: async (state) => {
      const todo = {
        ...state,
        createdAt: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
      };
      await addTodo(todo);
      await props.fetchTodos();
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
        <DialogContent>
          <form noValidate onSubmit={formik.handleSubmit}>
            <CustomTextField
              id="title"
              name="title"
              label="title*"
              variant="outlined"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={!!(formik.touched.title && formik.errors.title)}
              helperText={(formik.touched.title && formik.errors.title) || ""}
            />
            <CustomTextField
              id="description"
              name="description"
              label="description"
              variant="outlined"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
              />
            </LocalizationProvider>
            <SubmitButton name="add" handleClose={handleClose} />
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default AddTodo;
