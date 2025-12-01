export default async function getProduct({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [productId, storeId] = (await params).id.split(".");
  return (
    <div>
      getProduct : {productId} {storeId}
    </div>
  );
}
