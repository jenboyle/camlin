import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <h1>This page could not be found</h1>
      <Link href="/">Go back to Dashboard</Link>
    </>
  );
}
