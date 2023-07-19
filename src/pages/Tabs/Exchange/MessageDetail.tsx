import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTodoById } from "../../../services/api/todo";

export default function MessageDetailPage(props: any) {
    console.log('MESSAGE ')
    const { messages } = props;
    const { id } = useParams();
    const [todo, setTodo]:any = useState({});
   
    useEffect(() => {
        console.log("Appeler mon point d'api")
        async function loadTodo() {
          const todo = await getTodoById(id);
          setTodo(todo)
          console.log(todo)
        }
        loadTodo();
      }, [])

    return (
      <>
        <h2> {todo.title} </h2>
        <div> Ceci est la page des messages</div>
        { todo.completed ? <p> C'est terminé</p> :  <p> C'est pas terminé</p>}
      </>
    );
  }

