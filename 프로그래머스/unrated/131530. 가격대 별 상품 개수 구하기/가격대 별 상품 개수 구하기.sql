-- 코드를 입력하세요
select truncate(price,-4) as price_group, count(product_id) as products
from product
group by truncate(price, -4)
order by price_group;