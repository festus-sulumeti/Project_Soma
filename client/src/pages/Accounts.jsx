import ParentsAccounts from '@/components/ParentsAccounts';
import StudentAccounts from '@/components/StudentAccounts';
import TeacherAccounts from '@/components/TeacherAccounts';
import React from 'react'
import { useLocation } from 'react-router-dom'

const Accounts = () => {

  const {pathname} = useLocation();
  
  switch(pathname.split("/")[2]){
    case "students":
      return <StudentAccounts/>
      break;
    case "teachers":
      return <TeacherAccounts/>
      break;
    case "parents":
      return <ParentsAccounts/>
    default:
      return;
      break;
  }
}

export default Accounts