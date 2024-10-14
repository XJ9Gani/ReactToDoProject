import { useEffect, useState } from "react";
import LoadingPage from "./LoadingPage";
import axiosAPI from "../API/axiosAPI";
import { END_POINTS } from "../const";
import {
  Card,
  Container,
  Button,
  Form,
  FormLabel,
  FormControl,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

export default function ToDoPage() {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const todosState = useSelector((state) => state.todos);

  // Функция для завершения задачи
  const doneToDo = (id) => {
    dispatch({ type: "DONE", payload: id });
  };

  // Функция для удаления задачи
  const removeToDo = (id) => {
    dispatch({ type: "REMOVE", payload: id });
  };

  // Функция для добавления новой задачи
  const addToDo = () => {
    if (newTaskTitle.trim()) {
      dispatch({ type: "ADD", payload: newTaskTitle });
      setNewTaskTitle("");
    } else {
      alert("Введите задание!");
    }
  };

  const todosEndpoint = END_POINTS.todos;

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axiosAPI(todosEndpoint);

        // Установка полученных данных в состояние
        dispatch({ type: "SET_TODOS", payload: data });
      } catch (e) {
        alert("Ошибка при получении данных");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [dispatch, todosEndpoint]);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <>
      <Container>
        <Form>
          <Row>
            <FormLabel>Create Task</FormLabel>
            <FormControl
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
            />
            <Button
              onClick={addToDo}
              style={{
                width: "40%",
                textShadow: "0px 2px 3px black",
                margin: "auto",
                marginTop: "10px",
              }}
              variant="warning"
              className="text-white"
            >
              ADD
            </Button>
          </Row>
        </Form>
      </Container>

      <Container className="d-flex flex-wrap justify-content-around">
        {todosState.reverse().map(({ id, title, status }) => (
          <Card
            style={{
              width: "18em",
              height: "18em",
              zIndex: "1",
              marginTop: "10px",
              background: "grey",
              color: "white",
            }}
            key={id}
          >
            <Card.Body>
              <Card.Title style={{ height: "50px" }}>{title}</Card.Title>
              <Card.Text style={{ height: "100px" }}>
                {status || "In Progress"}
              </Card.Text>
              <Button
                variant="success"
                style={{ width: "50%" }}
                onClick={() => doneToDo(id)}
              >
                Выполнено
              </Button>
              <Button
                variant="danger"
                style={{ width: "50%" }}
                onClick={() => removeToDo(id)}
              >
                Удалить
              </Button>
              <Button
                variant="secondary"
                style={{ width: "50%" }}
                onClick={() => dispatch({ type: "UPDATE", payload: id })}
              >
                Изменить
              </Button>
            </Card.Body>
          </Card>
        ))}
      </Container>
    </>
  );
}
