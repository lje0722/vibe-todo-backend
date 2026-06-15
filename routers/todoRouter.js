const express = require("express");
const Todo = require("../models/Todo");

const router = express.Router();

// 할일 조회
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "할일 조회 성공",
      todos,
    });
  } catch (error) {
    res.status(500).json({
      message: "할일 조회 실패",
      error: error.message,
    });
  }
});

// 할일 생성
router.post("/", async (req, res) => {
  try {
    const { task } = req.body;

    const todo = await Todo.create({ task });

    res.status(201).json({
      message: "할일 저장 성공",
      todo,
    });
  } catch (error) {
    res.status(400).json({
      message: "할일 저장 실패",
      error: error.message,
    });
  }
});

// 할일 수정
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { task } = req.body;

    const todo = await Todo.findByIdAndUpdate(
      id,
      { task },
      { new: true, runValidators: true },
    );

    if (!todo) {
      return res.status(404).json({
        message: "할일을 찾을 수 없습니다",
      });
    }

    return res.status(200).json({
      message: "할일 수정 성공",
      todo,
    });
  } catch (error) {
    return res.status(400).json({
      message: "할일 수정 실패",
      error: error.message,
    });
  }
});

// 할일 삭제
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
      return res.status(404).json({
        message: "할일을 찾을 수 없습니다",
      });
    }

    return res.status(200).json({
      message: "할일 삭제 성공",
      todo,
    });
  } catch (error) {
    return res.status(400).json({
      message: "할일 삭제 실패",
      error: error.message,
    });
  }
});

module.exports = router;
