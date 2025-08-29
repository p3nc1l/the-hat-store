import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

const ProductsPage = async (props: { searchParams: Promise<{ category: string }> }) => {
  const supabase = await createClient();
  const category = (await props.searchParams).category;

  const { data: products } = category ? await supabase
    .from("products")
    .select()
    .eq("category", category)
    .order("name", { ascending: true }) : await supabase
    .from("products")
    .select()
    .order("name", { ascending: true });

  const { data: product_categories } = category ? await supabase
    .from("product_categories")
    .select()
    .eq("id", category)
    .single() : { data: { name: "Products" } };

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{product_categories?.name}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products?.map((product) => (
          <Link href={`/products/${product.id}`} key={product.id}>
            <Card className="h-full flex flex-col justify-between">
              <CardHeader>
                <AspectRatio ratio={1 / 1} className="flex items-center justify-center bg-neutral-100 dark:bg-neutral-800">
                  <span>No image</span>
                  {product.imageUrl && <Image src={product.imageUrl} alt={product.name} layout="fill" objectFit="cover" />}
                </AspectRatio>
              </CardHeader>
              <CardContent>
                {product.name}
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