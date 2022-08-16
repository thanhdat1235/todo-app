import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, setUser, setUsers, updateUser } from "../redux/actions";
import { userService } from "../service/userService/userService";
import { useSession, signOut, getSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession({ required: true });

  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);
  const [userState, setUserState] = useState();
  const inputRef = useRef(null);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const users = await userService.getAllUsers();
      dispatch(setUsers(users.data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddTodo = async () => {
    if (userState?.name) {
      try {
        let res;
        if (userState.id) {
          res = await userService.updateUser({
            id: userState.id,
            name: userState.name,
          });
          dispatch(updateUser(res.data));
        } else {
          res = await userService.createUser({ name: userState.name });
          dispatch(setUser(res.data));
        }
        setUserState();
        inputRef.current.focus();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await userService.deleteUser({
        id,
      });
      dispatch(deleteUser(id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (item) => {
    setUserState(item);
    inputRef.current.focus();
  };

  if (session) {
    return (
      <div className="container-fluid">
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
        />
        <div className="container todo-container">
          <div className="logout">
            <button className="btn btn-secondary" onClick={() => signOut()}>
              Logout
            </button>
          </div>
          <div className="header">
            <h1>Todo App</h1>
            <div className="add-todo">
              <input
                ref={inputRef}
                className="input-group"
                type="text"
                placeholder="Add your name"
                value={userState?.name || ""}
                onChange={(e) =>
                  setUserState({ ...userState, name: e.target.value })
                }
              />
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleAddTodo}
              >
                {userState?.id ? "Update Todo" : "Add Todo"}
              </button>
            </div>
          </div>
          <div className="list-todo">
            <h3>List Todo</h3>
            {users.map((item, index) => (
              <div className="list-item" key={index}>
                <div className="title">{item.name}</div>
                <div className="actions">
                  <span
                    className="material-symbols-outlined"
                    onClick={() => handleEdit(item)}
                  >
                    edit
                  </span>
                  <span
                    className="material-symbols-outlined"
                    onClick={() => handleDelete(item.id)}
                  >
                    delete
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return <div>You are not login</div>;
  }
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
      },
    };
  }
  return {
    props: { session },
  };
};
