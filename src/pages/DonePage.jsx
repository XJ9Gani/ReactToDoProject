import { Card, Container, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

export default function DonePage() {
  const dispatch = useDispatch();
  const doneToDoList = useSelector((state) => state.doneTodos);
  const removeToDo = (id) => {
    dispatch({ type: "REMOVE", payload: id });
  };
  const undoDone = (id) => {
    dispatch({ type: "UNDO_DONE", payload: id });
  };
  if (doneToDoList.lenght === 0) {
    return <h1>Пусто</h1>;
  }
  console.log(doneToDoList.lenght);
  return (
    <>
      <ul>
        <Container className="d-flex flex-wrap justify-content-around">
          {doneToDoList.map(({ id, title, status }) => (
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
                  onClick={() => undoDone(id)}
                >
                  Вернуть
                </Button>
                <Button
                  variant="danger"
                  style={{ width: "50%" }}
                  onClick={() => removeToDo(id)}
                >
                  Удалить
                </Button>
              </Card.Body>
            </Card>
          ))}
        </Container>
      </ul>
    </>
  );
}
