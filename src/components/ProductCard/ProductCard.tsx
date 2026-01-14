import { Link } from "react-router-dom";
import type { Product } from "../../types";
import styles from "src/components/ProductCard/ProductCard.module.css";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  // 가격 포맷팅
  const formattedPrice = product.price.toLocaleString("ko-KR");

  // 별점 렌더링
  const renderStars = () => {
    const fullStars = Math.floor(product.rating);
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <span key={i} className={styles.star}>
            ⭐
          </span>
        );
      } else {
        stars.push(
          <span key={i} className={stars.starEmpty}>
            ☆
          </span>
        );
      }
    }
    return stars;
  };

  return (
    <Link to={`/products/${product.id}`} className={styles.card}>
      {/* 뱃지 */}
      <div className={styles.badges}>
        {product.isBest && (
          <span className={`${styles.badge} ${styles.best}`}>BEST</span>
        )}
        {product.isNew && (
          <span className={`${styles.badge} ${styles.new}`}>NEW</span>
        )}
      </div>

      {/* 이미지 */}
      <div className={styles.imageWrapper}>
        <img src={product.image} alt={product.name} className={styles.image} />
      </div>

      {/* 정보 */}
      <div className={styles.info}>
        <p className={styles.category}>{product.category}</p>
        <h3 className={styles.name}>{product.name}</h3>

        <div className={styles.rating}>
          {renderStars()}
          <span className={styles.ratingText}>
            {product.rating} ({product.reviewCount})
          </span>
        </div>
        <p className={styles.price}>{formattedPrice}원</p>
      </div>
    </Link>
  );
}
