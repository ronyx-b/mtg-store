import { ProductCard } from "@/components/ProductCard";
import { SERVER_URL } from "@/config";
import useAllProducts from "@/services/cache/useAllProducts";
import useProductsBySet from "@/services/cache/useProductsBySet";
import useSetByCode from "@/services/cache/useSetByCode";
import { useRouter } from "next/router";
import { Button, Container, Image, Row } from "react-bootstrap";

export default function Products({ ...props }) {
  const router = useRouter();
  const { set, pageSize = 12, pageNum = 1 } = router.query;
  const setData = useSetByCode(set);
  const productsBySet = useProductsBySet(setData.data?.set?.name);
  const allProducts = useAllProducts({pageSize, pageNum});
  const productsData = set ? productsBySet : allProducts

  return (<div className="products-by-set" {...props}>
    <Container>
      {set && setData.data && <>
        <Image src={`${SERVER_URL}/img/hero/${setData.data?.set.hero}`} alt={setData.data?.set.name} className="d-block mw-100" />
        <div className="my-3">
          <Button size="lg" variant="primary" type="button" className="d-block mx-auto" onClick={() => router.push(`/cards?set=${setData.data?.set.code}`)}>Browse {setData.data?.set.name} singles</Button>
        </div>
      </>}
      {productsData.data && <>
        <Row xs={1} md={2} lg={3} xl={4}>
          {productsData.data?.productList?.map((product) => 
            <ProductCard key={product._id} product={product} />
          )}
        </Row>
      </>}
    </Container>
  </div>);
}