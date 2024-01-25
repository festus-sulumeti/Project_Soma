import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Checkbox } from "./ui/checkbox";

const Sidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="border-r border-r-gray-300 h-screen py-4 pl-14 pr-20">
      <h2
        className={`text-[22px] font-medium ${
          pathname === "/dashboard" && "text-blue-600"
        }`}
      >
        <Link to={"/dashboard"}>Dashboard</Link>
      </h2>
      <Accordion type="multiple" collapsible="true">
        <AccordionItem className="border-b-none" value="personnel">
          <AccordionTrigger
            className={`text-[22px] ${
              pathname.includes("accounts") && "text-blue-600"
            }`}
          >
            Accounts
          </AccordionTrigger>
          <AccordionContent>
            <RadioGroup
              value={
                pathname.includes("/accounts") ? pathname.split("/")[2] : ""
              }
              onValueChange={(e) => navigate(`/accounts/${e}`)}
              defaultValue=""
              className="ml-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="students" id="students" />
                <Label htmlFor="students">Students</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="teachers" id="teachers" />
                <Label htmlFor="teachers">Teachers</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="parents" id="parents" />
                <Label htmlFor="parents">Parents</Label>
              </div>
            </RadioGroup>
            <AccordionItem className="border-b-none" value="students">
              <AccordionTrigger className="ml-4 mt-[15px]">
                Filter by:
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2 *:ml-8">
                <div className="flex items-center gap-1">
                  <Checkbox id="grade-1" />
                  <label htmlFor="grade-1">Grade 1</label>
                </div>
                <div className="flex items-center gap-1">
                  <Checkbox id="grade-2" />

                  <label htmlFor="grade-2">Grade 2</label>
                </div>
              </AccordionContent>
            </AccordionItem>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="school-planning">
          <AccordionTrigger className="text-[24px] text-nowrap">
            School Planning
          </AccordionTrigger>
          <AccordionContent className="ml-6">
            <RadioGroup
              value={pathname.includes("/school") ? pathname.split("/")[2] : ""}
              onValueChange={(e) => navigate(`/school/${e}`)}
              defaultValue=""
              className="ml-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="events" id="events" />
                <Label htmlFor="events">Term Events</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="exams" id="exams" />
                <Label htmlFor="exams">Exams</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="library" id="library" />
                <Label htmlFor="library">Library</Label>
              </div>
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Sidebar;
