import { PageProps } from "$fresh/server.ts";

export default function Room(props: PageProps) {
  const { key } = props.params;

  return (
    <>
      {key}
    </>
  );
}
