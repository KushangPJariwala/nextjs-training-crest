import fs from 'fs/promises'
import Link from 'next/link';
import * as path from 'path'
function HomePage(props) {
  return (
    <ul>
      {props.products.map((p) => (
        <Link href={`/${p.id}`}>
        <li key={p.id}>{p.title}</li>
        </Link>
      ))}{" "}
    </ul>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  console.log("data", data);
  
  return {
    props: {
      products: data.products,
    },
  };
}
export default HomePage;
