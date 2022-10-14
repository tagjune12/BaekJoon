SELECT ANIMAL_TYPE, COUNT(*) 
from ANIMAL_INS
where animal_type like 'cat' or animal_type like 'dog'
group by ANIMAL_TYPE
order by animal_type;