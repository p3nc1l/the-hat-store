import { createClient } from "@/utils/supabase/server"
import { notFound } from "next/navigation";

const Page = async (props: { params: Promise<{ productName: string }> }) => {
  const supabase = await createClient();
  const { productName } = await props.params;

  const { data: product } = await supabase
    .from("products")
    .select()
    .eq("name", productName)
    .single();

  if (!product) notFound();

  return (
    <div>
      {product.title}
    </div>
  )
}

export default Page;