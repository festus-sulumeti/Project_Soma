import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import ParentAccountForm from "./ParentAccountForm";
import TeacherAccountForm from "./TeacherAccountForm";
import StudentAccountForm from "./StudentAccountForm";

const CreateAccount = () => {
  const [accountType, setSelectAccountType] = useState("student");

  const renderedForm = {
    "parent":<ParentAccountForm/>,
    "teacher":<TeacherAccountForm/>,
    "student":<StudentAccountForm/>
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <Select defaultValue="student" onValueChange={(e) => {setSelectAccountType(e)}}>
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Select an account type to continue" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="parent">Parent</SelectItem>
          <SelectItem value="student">Student</SelectItem>
          <SelectItem value="teacher">Teacher</SelectItem>
        </SelectContent>
      </Select>
      {renderedForm[accountType]}
    </div>
  );
};

export default CreateAccount;
