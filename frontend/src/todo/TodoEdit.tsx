import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Popover,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { TodoState } from "./types/types";
import { useLocation, useNavigate } from "react-router-dom";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import { deleteTodo, updateTodo } from "./api/api";
import CloseIcon from "@mui/icons-material/Close";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import * as Yup from "yup";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import { useFormik } from "formik";
import SubmitButton from "../components/SubmitButton";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

interface TodoEditProps {
  todos: TodoState[];
  setTodos: React.Dispatch<React.SetStateAction<TodoState[]>>;
}

const TodoEdit: React.FC<TodoEditProps> = (props) => {
  const location = useLocation();
  const id = location.state?.id;
  const navigate = useNavigate();
  const todo = props.todos.find((todo) => todo.id === id) as TodoState;

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
  });

  const [actionOpen, setActionOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClose = () => {
    navigate("/");
  };

  const handleActionOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    setActionOpen(true);
    setAnchorEl(e.currentTarget);
  };

  const handleActionClose = () => {
    setActionOpen(false);
  };

  const handleCheckImportant = async (todo: TodoState) => {
    const updateData = { ...todo, important: !todo.important };
    await updateTodo(todo.id, updateData);
    props.setTodos(props.todos.map((t) => (t.id === todo.id ? updateData : t)));
  };

  const handleCheckDone = async (todo: TodoState) => {
    const updateData = { ...todo, done: !todo.done };
    await updateTodo(todo.id, updateData);
    props.setTodos(props.todos.map((t) => (t.id === todo.id ? updateData : t)));
  };

  const handleDeleteTodo = async (todo: TodoState) => {
    const newTodos = props.todos.filter((t) => todo.id !== t.id);
    await deleteTodo(todo.id);
    props.setTodos(newTodos);
    setActionOpen(false);
    navigate("/");
  };

  const formik = useFormik({
    initialValues: {
      id: todo.id,
      title: todo.title,
      description: todo.description,
      done: todo.done,
      important: todo.important,
      date: todo.date,
      createdAt: todo.createdAt,
    },
    validationSchema,
    onSubmit: async (state) => {
      // 最新のtodoを取得
      const todo = props.todos.find((todo) => todo.id === id) as TodoState;
      const updateData = {
        ...todo,
        title: state.title,
        description: state.description,
        date: state.date,
      };
      await updateTodo(id, updateData);
      props.setTodos(
        props.todos.map((t) => (t.id === todo.id ? updateData : t))
      );
    },
  });

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      fullWidth
      // sx={{ maxHeight: "80vh" }}
    >
      <DialogTitle>Task Details</DialogTitle>
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
      <Box>
        <IconButton
          aria-label="action"
          onClick={handleActionOpen}
          sx={{
            position: "absolute",
            right: 48,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <MoreHorizIcon />
        </IconButton>
        <Popover
          open={actionOpen}
          onClose={handleActionClose}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Box sx={{ p: 2 }}>
            <Stack spacing={1}>
              <Typography variant="caption">
                追加日: {todo.createdAt}
              </Typography>
              <Divider />
              <Button
                startIcon={<StarIcon />}
                fullWidth
                sx={{ display: "flex", justifyContent: "flex-start" }}
                onClick={() => handleCheckImportant(todo)}
              >
                {todo.important ? "お気に入りから外す" : "お気に入りにする"}
              </Button>
              <Button
                startIcon={<DeleteIcon />}
                fullWidth
                sx={{ display: "flex", justifyContent: "flex-start" }}
                onClick={() => handleDeleteTodo(todo)}
              >
                タスクを削除...
              </Button>
            </Stack>
          </Box>
        </Popover>
      </Box>
      <DialogContent>
        <form noValidate onSubmit={formik.handleSubmit}>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ pr: 1 }}>
              <Checkbox
                icon={<CircleOutlinedIcon />}
                checkedIcon={<CheckCircleOutlinedIcon />}
                checked={todo.done}
                onChange={() => handleCheckDone(todo)}
              />
            </Box>
            <Box
              sx={{ display: "flex", flexDirection: "column", width: "100%" }}
            >
              <Stack spacing={1}>
                <TextField
                  id="title"
                  label="Title"
                  variant="standard"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={!!(formik.touched.title && formik.errors.title)}
                  helperText={
                    (formik.touched.title && formik.errors.title) || ""
                  }
                />
                <TextField
                  id="description"
                  label="description"
                  multiline
                  rows={4}
                  variant="standard"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Deadline"
                    value={
                      formik.values.date ? dayjs(formik.values.date) : null
                    }
                    onChange={(date) => {
                      formik.setFieldValue(
                        "date",
                        date ? dayjs(date).format("YYYY-MM-DD") : null
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
            </Box>
          </Box>
          <SubmitButton name="update" handleClose={handleClose} />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TodoEdit;
