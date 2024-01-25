import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Link } from 'react-router-dom';


const AccountSummary = () => {


  return (
    <div className="mt-5 grid grid-cols-4 gap-4 *:cursor-pointer">
      <Link to={"/accounts/students"}>
        <Card>
          <CardHeader>
            <CardTitle>Students</CardTitle>
            <CardDescription>Number of students: 10000</CardDescription>
          </CardHeader>
        </Card>
      </Link>
      <Link to={"/accounts/parents"}>
        <Card>
          <CardHeader>
            <CardTitle>Parents</CardTitle>
            <CardDescription>Number of parents: 10000</CardDescription>
          </CardHeader>
        </Card>
      </Link>
      <Link to={"/accounts/teachers"}>
        <Card>
          <CardHeader>
            <CardTitle>Teachers</CardTitle>
            <CardDescription>Number of teachers: 10000</CardDescription>
          </CardHeader>
        </Card>
      </Link>
      <Link to={"/school/events"}>
        <Card>
          <CardHeader>
            <CardTitle>Events</CardTitle>
            <CardDescription>Number of upcoming events: 10000</CardDescription>
          </CardHeader>
        </Card>
      </Link>
    </div>
  );
}

export default AccountSummary