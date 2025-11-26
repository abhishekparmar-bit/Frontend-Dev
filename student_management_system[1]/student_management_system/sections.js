const API_URL = "http://localhost:3000/sections";

/* Load Sections */
async function loadSections() {
    const res = await fetch(API_URL);
    const data = await res.json();

    const body = document.getElementById("sectionsBody");
    body.innerHTML = "";

    if (data.length === 0) {
        body.innerHTML = `<tr><td colspan="4" class="empty">No sections found</td></tr>`;
        return;
    }

    data.forEach(section => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${section.name}</td>
            <td>${section.className || "-"}</td>
            <td>${section.room || "-"}</td>
            <td>
                <button class="btn secondary">Edit</button>
                <button class="btn primary" style="background:#ef4444;" onclick="deleteSection(${section.id})">Delete</button>
            </td>
        `;
        body.appendChild(tr);
    });
}

loadSections();

/* Modal Controls */
function openSectionModal() {
    document.getElementById("sectionModal").style.display = "flex";
}

function closeSectionModal() {
    document.getElementById("sectionModal").style.display = "none";

    document.getElementById("sectionName").value = "";
    document.getElementById("sectionClass").value = "";
    document.getElementById("sectionRoom").value = "";
}

/* Create Section */
async function createSection() {
    const name = document.getElementById("sectionName").value.trim();
    const className = document.getElementById("sectionClass").value.trim();
    const room = document.getElementById("sectionRoom").value.trim();

    if (!name) {
        alert("Section Name is required");
        return;
    }

    const section = {
        name: name,
        className: className,
        room: room
    };

    await fetch(API_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(section)
    });

    closeSectionModal();
    loadSections();
}

/* Delete Section */
async function deleteSection(id) {
    if (!confirm("Delete this section?")) return;

    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    loadSections();
}
