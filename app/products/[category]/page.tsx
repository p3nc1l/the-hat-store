import ProductsPage from "../ProductsPage";

const Page = async (props: { params: Promise<{ category: string }> }) => {
  const { category } = await props.params;

  return <ProductsPage categoryName={category} />
}

export default Page;