import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type Product = {
  id: number,
  name: string,
  title: string,
  price: number,
  imageUrls: string[] | null
};

const GridItem = ({ product }: { product: Product }) => {
  return (
    <Link href={`/${product.name}`} key={product.id}>
      <Card className="h-full flex flex-col justify-between">
        <CardHeader>
          <AspectRatio ratio={1 / 1} className="flex items-center justify-center bg-neutral-100 dark:bg-neutral-800">
            {product.imageUrls ? 
            <>
              <Skeleton className="w-full h-full bg-neutral-300 dark:bg-neutral-600 rounded-none" />
              <Image src={product.imageUrls[0]} alt={product.name} layout="fill" objectFit="cover" />
            </> : 
            <span>No image</span>}
          </AspectRatio>
        </CardHeader>
        <CardContent>
          {product.title}
        </CardContent>
        <CardFooter className="flex justify-between">
          <div>{product.price} $</div>
          <Button size={"icon"} aria-label="Add to cart">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}

const Grid = ({ products, variant = "content" }: { products?: Product[], variant?: "content" | "skeleton" }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {variant == "content" ? products?.map((product) => (
        <GridItem product={product} key={product.id} />
      )) : Array.from({ length: 8 }).map((_, index) => (
        <Skeleton className="w-full h-75" key={index} />
      ))}
    </div>
  )
}

const ContentSkeleton = () => {
  return (
    <>
      <Skeleton className="w-40 h-8 mb-4" />
      <Grid variant="skeleton" />
    </>
  )
}

const Content = async ({ categoryName }: { categoryName?: string }) => {
  const supabase = await createClient();

  const { data: category } = categoryName ? await supabase
    .from("product_categories")
    .select()
    .eq("name", categoryName)
    .single() : { data: undefined };

  if (categoryName && !category) notFound();

  const { data: products } = category ? await supabase
    .from("products")
    .select()
    .eq("category", category.id)
    .order("name", { ascending: true }) : await supabase
    .from("products")
    .select()
    .order("name", { ascending: true });

  return (
      <>
        <h1 className="text-2xl font-bold mb-4">{category?.title || "Products"}</h1>
        <Grid products={products || []} />
      </>
  );
}

const ProductsPage = (props: { categoryName?: string } ) => {
  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <Suspense fallback={<ContentSkeleton />}>
        <Content categoryName={props.categoryName} />
      </Suspense>
    </div>
    
  );
};

export default ProductsPage;