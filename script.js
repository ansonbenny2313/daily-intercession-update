document.getElementById('submit-button').addEventListener('click', function() {
    // Get the current remaining counts
    let remainingHailMary = parseInt(document.getElementById('remaining-hail-mary').textContent);
    let remainingOurFather = parseInt(document.getElementById('remaining-our-father').textContent);
    let remainingGloryBe = parseInt(document.getElementById('remaining-glory-be').textContent);

    // Get the new counts entered by the user
    const updatedHailMary = parseInt(document.getElementById('update-hail-mary').value) || 0;
    const updatedOurFather = parseInt(document.getElementById('update-our-father').value) || 0;
    const updatedGloryBe = parseInt(document.getElementById('update-glory-be').value) || 0;

    // Calculate the new remaining counts
    const newHailMary = remainingHailMary - updatedHailMary;
    const newOurFather = remainingOurFather - updatedOurFather;
    const newGloryBe = remainingGloryBe - updatedGloryBe;

    // Update the displayed remaining counts
    document.getElementById('remaining-hail-mary').textContent = Math.max(0, newHailMary);
    document.getElementById('remaining-our-father').textContent = Math.max(0, newOurFather);
    document.getElementById('remaining-glory-be').textContent = Math.max(0, newGloryBe);

    // Clear the input fields after submission
    document.getElementById('update-hail-mary').value = 0;
    document.getElementById('update-our-father').value = 0;
    document.getElementById('update-glory-be').value = 0;
});