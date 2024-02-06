import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { toDoState, IToDo, categoryState } from "../atoms";

interface IForm {
  toDoBasic: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState<IToDo[]>(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDoBasic }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDoBasic, id: Date.now(), category },
      ...oldToDos,
    ]);
    setValue("toDoBasic", "");
  };
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDoBasic", {
          required: "Please write a To Do",
        })}
        placeholder="Write a to do"
      />
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;
