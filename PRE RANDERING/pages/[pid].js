import React from "react";
import fs from "fs/promises";
import Link from "next/link";
import * as path from "path";

export default function Details(props) {
  const p = props.product;
  console.log("p", p);
  return (
    <div>
      <h1>{p?.title}</h1>
      <h2>{p?.description}</h2>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  const product = data.products.find((p) => p.id === params.pid);
  if (!product) {
    return { notFound: true };
  }
  return {
    props: {
      product: { ...product },
    },
  };
}
export async function getStaticPaths() {
  return {
    paths: [{ params: { pid: "p1" } }],
    fallback: true,
  };
}
