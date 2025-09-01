// script.js
const API_BASE_URL = window.location.origin;

// Function to fetch and display counts
async function fetchAndDisplayCounts() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/counts`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const counts = await response.json();
        document.getElementById('remaining-hail-mary').textContent = counts['hail-mary'];
        document.getElementById('remaining-our-father').textContent = counts['our-father'];
        document.getElementById('remaining-glory-be').textContent = counts['glory-be'];
    } catch (error) {
        console.error('Error fetching counts:', error);
    }
}

// Function to handle form submission
async function handleSubmit() {
    const updatedHailMary = parseInt(document.getElementById('update-hail-mary').value) || 0;
    const updatedOurFather = parseInt(document.getElementById('update-our-father').value) || 0;
    const updatedGloryBe = parseInt(document.getElementById('update-glory-be').value) || 0;

    try {
        const response = await fetch(`${API_BASE_URL}/api/update-counts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                hailMary: updatedHailMary,
                ourFather: updatedOurFather,
                gloryBe: updatedGloryBe
            })
        });

        if (!response.ok) {
            throw new Error('Failed to update counts.');
        }

        const newCounts = await response.json();
        document.getElementById('remaining-hail-mary').textContent = newCounts['hail-mary'];
        document.getElementById('remaining-our-father').textContent = newCounts['our-father'];
        document.getElementById('remaining-glory-be').textContent = newCounts['glory-be'];

        // Clear input fields
        document.getElementById('update-hail-mary').value = 0;
        document.getElementById('update-our-father').value = 0;
        document.getElementById('update-glory-be').value = 0;

    } catch (error) {
        console.error('Error updating counts:', error);
        alert('Failed to update count. Please try again.');
    }
}

document.getElementById('submit-button').addEventListener('click', handleSubmit);

// Initial fetch of counts when the page loads
fetchAndDisplayCounts();