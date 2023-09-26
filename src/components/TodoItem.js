import React from "react";
import { Col, Row } from "react-bootstrap";
import api from "../utils/api";

const TodoItem = ({ item, getTasks }) => {
  const handleDelete = async (id) => {
    try {
      const response = await api.delete(`tasks/${id}`);
      getTasks();

      if (response.status === 200) {
        getTasks();
      } else {
        throw new Error("실패했습니다");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleDone = async (id, isComplete) => {
    const taskState = isComplete;
    try {
      const response = await api.put(`tasks/${id}`, {
        isComplete: !taskState,
      });

      if (response.status === 200) {
        getTasks();
      } else {
        throw new Error("실패했습니다");
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <Row>
      <Col xs={12}>
        <div className={`todo-item ${item.isComplete ? "done" : ""}`}>
          <div className="todo-content">{item.task}</div>

          <div>
            <button
              className="button-delete"
              onClick={() => handleDelete(item._id)}
            >
              삭제
            </button>
            <button
              className="button-delete"
              onClick={() => handleDone(item._id, item.isComplete)}
            >
              {item.isComplete === true ? "취소" : "끝남"}
            </button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;
