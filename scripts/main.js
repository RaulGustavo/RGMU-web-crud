import app from "./index.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  deleteDoc,
  getDoc,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";

const db = getFirestore(app);

const taskForm = document.getElementById("task-form");
const taskContainer = document.getElementById("task-card");

let editStatus = false;
let id = "";

const saveTask = (title, description) => {
  addDoc(collection(db, "tasks"), {
    title,
    description
  });
};

const getTasks = () => getDocs(collection(db, "tasks"));

const getTask = (id) => getDoc(doc(db, "tasks", id));

const onGetTasks = (callback) => onSnapshot(collection(db, "tasks"), callback);

const deleteTask = (id) => deleteDoc(doc(db, "tasks", id));

const updateTask = (id, updatedTask) => {
  return updateDoc(doc(db, "tasks", id), updatedTask);
};

// Cargar tasks
window.addEventListener("DOMContentLoaded", async (e) => {
  try {
    onGetTasks((querySnapshot) => {
      taskContainer.innerHTML = "";
      querySnapshot.forEach((doc) => {
        const task = doc.data();
        task.id = doc.id;
        taskContainer.innerHTML += `
        <div class="card card-body mt-2 border-primary">
          <h3 class="h5">${task.title}</h3>
          <p>${task.description}</p>
          <div>
            <button class="btn btn-primary btn-delete" data-id="${task.id}">Delete</button>
            <button class="btn btn-info btn-edit" data-id=${task.id}>Edit</button>
          </div>
        </div>
        `;

        const btnsDelete = document.querySelectorAll(".btn-delete");
        btnsDelete.forEach((btn) => {
          btn.addEventListener("click", async (e) => {
            await deleteTask(e.target.dataset.id);
          });
        });

        const btnsEdit = document.querySelectorAll(".btn-edit");
        btnsEdit.forEach((btn) => {
          btn.addEventListener("click", async (e) => {
            const task = await getTask(e.target.dataset.id);
            editStatus = true;
            id = e.target.dataset.id;
            taskForm["task-title"].value = task.data().title;
            taskForm["task-description"].value = task.data().description;
            taskForm["btn-task-form"].innerText = "Update";
          });
        });
      });
    });
  } catch (e) {
    console.log("Error accesing database");
  }
});

taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("task-title").value;
  const description = document.getElementById("task-description").value;

  if (!editStatus) {
    try {
      saveTask(title, description);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  } else {
    updateTask(id, { title: title, description: description });
    editStatus = false;
    id = "";
    taskForm["btn-task-form"].innerText = "Save";
  }
  taskForm.reset();
  await getTasks();
});
