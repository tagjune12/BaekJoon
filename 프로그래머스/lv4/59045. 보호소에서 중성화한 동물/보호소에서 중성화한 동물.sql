-- 코드를 입력하세요
select outs.animal_id, outs.animal_type, outs.name
from animal_outs as outs
join animal_ins as ins
on ins.animal_id = outs.animal_id
where ins.sex_upon_intake like 'intact%'
and (outs.sex_upon_outcome like 'neutered%'
    or outs.sex_upon_outcome like 'spayed%');
# where ins.name like 'maxwell2';