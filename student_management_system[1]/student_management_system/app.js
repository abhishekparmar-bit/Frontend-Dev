/*
   API URL - ye server ka address hai
   Yaha se data aayega aur yahi pe jayega
*/


const API_URL = "http://localhost:3000/students";


   /*TAB SWITCHING (Students / Sections / Results)*/
   


document.getElementById("tabStudents").onclick = () => showPage("pageStudents", "tabStudents");

function showPage(pageId, tabId) {

    /* Sab pages ko hide kar rahe */
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));

    /* Sab tabs se active class hata rahe */
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));

    /* Jo page chahiye, usko show kar rahe */
    document.getElementById(pageId).classList.add("active");

    /* Jo tab click hua, use active bana rahe */
    document.getElementById(tabId).classList.add("active");
}

  /* LOAD STUDENTS FROM SERVER*/
  


async function loadStudents() {
    try {
        const res = await fetch(API_URL);   // server ko request
        const data = await res.json();      // JSON data milta hai

        const body = document.getElementById("studentsBody");
        body.innerHTML = ""; // Purani rows clear

        /* Agar data khali hai */
        if (data.length === 0) {
            body.innerHTML = `
                <tr>
                    <td colspan="5" class="empty">No students found</td>
                </tr>`;
            return;
        }

        /* Table me data bhar rahe */
        data.forEach(student => {
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>${student.section || "-"}</td>
                <td>${student.enrollmentDate || "-"}</td>
                <td>
                    <button class="btn secondary" onclick="editStudent(${student.id})">Edit</button>
                    <button class="btn primary" style="background:#ef4444;" onclick="deleteStudent(${student.id})">Delete</button>
                </td>
            `;

            body.appendChild(tr);
        });

    } catch (error) {
        console.log("Error loading students:", error);
    }
}

/* Page load hote hi student data load hoga */
loadStudents();

/*
   MODAL OPEN / CLOSE
*/

function openStudentModal() {
    document.getElementById("studentModal").style.display = "flex";
}

function closeStudentModal() {
    document.getElementById("studentModal").style.display = "none";

    /* Inputs clear */
    document.getElementById("studentName").value = "";
    document.getElementById("studentEmail").value = "";
    document.getElementById("studentSection").value = "";
    document.getElementById("studentDate").value = "";
}

/* 
   CREATE (POST) STUDENT
   Server pe new student bhejna
 */

async function createStudent() {

    const name    = document.getElementById("studentName").value.trim();
    const email   = document.getElementById("studentEmail").value.trim();
    const section = document.getElementById("studentSection").value.trim();
    const date    = document.getElementById("studentDate").value;

    /* Validation */
    if (!name || !email) {
        alert("Name and Email are required!");
        return;
    }

    const student = {
        name: name,
        email: email,
        section: section,
        enrollmentDate: date
    };

    try {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(student)
        });

        closeStudentModal(); // modal band
        loadStudents();      // table refresh

    } catch (error) {
        console.log("Error creating student:", error);
    }
}

/* 
   DELETE STUDENT
 */

async function deleteStudent(id) {
    if (!confirm("Are you sure you want to delete?")) return;

    try {
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        loadStudents(); // delete ke baad reload table

    } catch (error) {
        console.log("Error deleting student:", error);
    }
}

/* 
   EDIT STUDENT (BASIC PLACEHOLDER)
 */

function editStudent(id) {
    alert("Edit feature backend se connect karna hoga. Student ID: " + id);
}
function goToSections() {
    window.location.href = "sections.html";
}

