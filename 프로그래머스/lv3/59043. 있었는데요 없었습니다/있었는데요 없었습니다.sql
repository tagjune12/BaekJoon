-- 코드를 입력하세요
select i.animal_id as animal_id, i.name as name
from animal_ins as i
join animal_outs as o
on i.animal_id = o.animal_id
where i.datetime > o.datetime
order by i.datetime;