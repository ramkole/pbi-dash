import dynamic from "next/dynamic";

const TaskFormPage = dynamic(() => import("@/app/tasks/_components/TaskForm"), {
  ssr: false,
});

const NewTaskPage = () => {
  return <TaskFormPage />;
};

export default NewTaskPage;
