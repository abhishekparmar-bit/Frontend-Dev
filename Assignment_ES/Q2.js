"use strict";

const employees = [
    { name: "Amit", salary: "45000", years: "5" },
    { name: "Sara", salary: "38000", years: "2" },
    { name: "Kiran", salary: "52000", years: "7" }
];

function calculateBonus(emp) {
    try {
      
        if (!emp.name || !emp.salary || !emp.years) {
            throw new Error(`Invalid employee record: ${JSON.stringify(emp)}`);
        }

       
        const salary = Number(emp.salary);
        const years = Number(emp.years);

    
        if (isNaN(salary) || isNaN(years)) {
            throw new Error(`Invalid numeric data for employee: ${emp.name}`);
        }

        let bonus = years > 3 ? salary * 0.1 : salary * 0.05;

        console.log(`
Employee: ${emp.name}
Salary: ₹${salary}
Years of Experience: ${years}
Bonus Awarded: ₹${bonus.toFixed(2)}
-----------------------------------------
        `);

    } catch (error) {
        console.log("⚠ Error:", error.message);
    }
}


employees.forEach(calculateBonus);
