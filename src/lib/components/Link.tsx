import NextLink from "next/link";
import React from "react";

type Props = React.PropsWithChildren<{
  href: string;
}>;

export default function Link({ href, children }: Props) {
  return <NextLink href={href}>{children}</NextLink>;
}
