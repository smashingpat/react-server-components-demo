"use client";

import React from "react";
import sleep from "~src/lib/utils/sleep";

let value: string | null = null;

function SuspendedComponent() {
  if (value === null) {
    value = "Hello world";
    throw sleep(1000);
  }
  const renderValue = value;
  value = null;
  return <h1>{renderValue}</h1>;
}

export default function page() {
  return (
    <React.Suspense fallback={<h1>loading</h1>}>
      <SuspendedComponent />
    </React.Suspense>
  );
}
