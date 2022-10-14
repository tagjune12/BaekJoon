-- 코드를 입력하세요
select outs.animal_id,outs.name
from animal_outs as outs
left join animal_ins as ins
on ins.animal_id = outs.animal_id
where ins.datetime is null
order by outs.animal_id asc;