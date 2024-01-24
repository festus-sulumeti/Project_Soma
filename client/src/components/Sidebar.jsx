import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "./ui/checkbox";

const Sidebar = () => {
  return (
    <div className="border-r border-r-gray-300 h-screen py-4 pr-20">
      <Accordion type="multiple" collapsible>
        <AccordionItem className="border-b-none" value="personnel">
          <AccordionTrigger className="text-[24px]">Accounts</AccordionTrigger>
          <AccordionContent>
            <RadioGroup defaultValue="" className="ml-3">
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
              <AccordionTrigger className="ml-6 mt-[10px]">
                Filter by:
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2">
                <div className="ml-8 flex items-center gap-2">
                  <Checkbox id="grade-1" rounded />
                  <label htmlFor="grade-1">Grade 1</label>
                </div>
                <div className="ml-8 flex items-center gap-2">
                  <Checkbox id="grade-2" rounded />
                  <label htmlFor="grade-2">Grade 2</label>
                </div>
              </AccordionContent>
            </AccordionItem>
          </AccordionContent>
        </AccordionItem>
        
        {/* School Planning Section */}
        <AccordionItem value="school-planning">
          <AccordionTrigger className="text-[24px]">School Planning</AccordionTrigger>
          <AccordionContent className="ml-6">
            <div className="flex flex-col gap-2">
              <Checkbox id="term-events" rounded />
              <label htmlFor="term-events" className="ml-2">Term Events</label>

              <Checkbox id="exams" rounded />
              <label htmlFor="exams" className="ml-2">Exams</label>

              <Checkbox id="library" rounded />
              <label htmlFor="library" className="ml-2">Library</label>
            </div>
          </AccordionContent>
        </AccordionItem>
        {/* End of School Planning Section */}
      </Accordion>
    </div>
  );
};

export default Sidebar;
