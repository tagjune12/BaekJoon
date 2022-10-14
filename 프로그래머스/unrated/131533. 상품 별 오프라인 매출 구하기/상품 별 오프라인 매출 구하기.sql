-- 코드를 입력하세요
select product_code, price * sum_amount as sales
from product
join (
    select product_id, sum(sales_amount) as sum_amount
    from offline_sale
    group by product_id) as a
on product.product_id = a.product_id
order by sales desc, product_code;