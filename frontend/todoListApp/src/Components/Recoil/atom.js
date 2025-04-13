import { atom } from "recoil";
const taskListAtom = atom({
  key: "TaskList",
  default: [],
});

export default taskListAtom;
