import * as React from "react";

import { cn } from "@/lib/utils";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Button } from "./button";
import { useState } from "react";

const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    const [hidden, setHidden] = useState(type === "password");

    return (
      <div className="relative">
        <input
          type={type === "password" ? (hidden ? "password" : "text") : type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {type === "password" ? (
          <Button
            asChild
            variant="ghost"
            onClick={() => setHidden((prev) => !prev)}
          >
            {hidden ? (
              <EyeInvisibleOutlined className="absolute top-1/2 translate-y-[-50%] right-1" />
            ) : (
              <EyeOutlined className="absolute top-1/2 translate-y-[-50%] right-1" />
            )}
          </Button>
        ) : (
          ""
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
