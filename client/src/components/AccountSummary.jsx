import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


const AccountSummary = () => {
  return (
    <div className='mt-5 grid grid-cols-4 gap-4 *:cursor-pointer'>
      <Card>
        <CardHeader>
          <CardTitle>
            Students
          </CardTitle>
          <CardDescription>
            Number of students: 10000
          </CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>
            Parents
          </CardTitle>
          <CardDescription>
            Number of parents: 10000
          </CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>
            Teachers
          </CardTitle>
          <CardDescription>
            Number of teachers: 10000
          </CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>
            Events
          </CardTitle>
          <CardDescription>
            Number of upcoming events: 10000
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}

export default AccountSummary