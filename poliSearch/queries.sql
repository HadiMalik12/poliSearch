--Get legislator names, state, hrep or senator, and gender for legislators who were born in "October" sorted by legislator type, by state within legislator type and by last names within state.
SELECT 'SENATOR' AS legislator_type, state, lname, fname, gender, birthday 
FROM SENATOR
WHERE strftime('%m', birthday) = '10'
UNION ALL
SELECT 'HREP' AS legislator_type, state, lname, fname, gender, birthday
FROM HREP
WHERE strftime('%m', birthday) = '10'
ORDER BY legislator_type, state, lname;
--Get senator names and state codes of senators who are younger than 50 years old sorted by age (youngest to oldest). You may use the following expression to compute age from birthday: round((julianday('now') - julianday(birthday))/365.25,0)
SELECT state, lname, fname, round((julianday('now') - julianday(birthday))/365.25, 0) as age
FROM SENATOR
WHERE round((julianday('now') - julianday(birthday))/365.25, 0) < 50
ORDER BY age;
--Get state codes and number of house representatives in each state sorted in descending order of number of house representatives. Do not include states that have fewer than 10 representatives.
SELECT state, count(*) as num_house_reps
FROM HREP
GROUP BY state
HAVING count(*) >= 10
ORDER BY num_house_reps DESC;
--Get counts of male and female legislators for senate as well as house of representatives.
SELECT 'HREP' AS legislator_type, gender, count(*) as num_house_reps
FROM HREP
GROUP BY gender
UNION ALL
SELECT 'SENATOR' AS legislator_type, gender, count(*) as num_senators
FROM SENATOR
GROUP BY gender