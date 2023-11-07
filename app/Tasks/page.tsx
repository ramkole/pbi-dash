"use client";

import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <Button>
        <Link href="/tasks/new">New PBI</Link>
      </Button>
    </div>
  );
};

export default page;
