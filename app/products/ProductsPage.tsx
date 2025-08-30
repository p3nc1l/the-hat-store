import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { notFound } from "next/navigation";

const ProductsPage = async (props: { categoryName?: string } ) => {
  const supabase = await createClient();

  const { data: category } = props.categoryName ? await supabase
    .from("product_categories")
    .select()
    .eq("name", props.categoryName)
    .single() : { data: undefined };

  if (props.categoryName && !category) notFound();

  const { data: products } = category ? await supabase
    .from("products")
    .select()
    .eq("category", category.id)
    .order("name", { ascending: true }) : await supabase
    .from("products")
    .select()
    .order("name", { ascending: true });

  

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{category?.title || "Products"}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products?.map((product) => (
          <Link href={`/${product.name}`} key={product.id}>
            <Card className="h-full flex flex-col justify-between">
              <CardHeader>
                <AspectRatio ratio={1 / 1} className="flex items-center justify-center bg-neutral-100 dark:bg-neutral-800">
                  <span>No image</span>
                  {product.imageUrl && <Image src={product.imageUrl} alt={product.name} layout="fill" objectFit="cover" />}
                </AspectRatio>
              </CardHeader>
              <CardContent>
                {product.title}
              </CardContent>
              <CardFooter className="flex justify-between">
                <div>{product.price} $</div>
                <Button>Add to Cart</Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;