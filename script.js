document.addEventListener("DOMContentLoaded", () => {

  // 1️⃣ Handle form submission (activities.html)
  const form = document.getElementById("activity-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // Get values from the form inputs
      const car = parseFloat(document.getElementById("car").value) || 0;
      const electricity = parseFloat(document.getElementById("electricity").value) || 0;
      const meat = parseFloat(document.getElementById("meat").value) || 0;

      // Basic emission calculation
      // CO₂ emission factors (in kg):
      // Car: 0.2 kg/km, Electricity: 0.4 kg/kWh, Meat: 1.5 kg/meal
      const total = (car * 0.2) + (electricity * 0.4) + (meat * 1.5);

      // Store result for use on results page
      localStorage.setItem("carbonFootprint", total.toFixed(2));

      // Redirect to results page
      window.location.href = "results.html";
      console.log("Loaded total from localStorage:", total);

    });
  }
  

  // 2️⃣ Display result with animation (results.html)
  const resultEl = document.getElementById("result-text");
  if (resultEl) {
    const total = parseFloat(localStorage.getItem("carbonFootprint")) || 0;

    // Animate number from 0 to total
    let current = 0;
    const duration = 1000; // 1 second
    const increment = total / (duration / 20);

    const animate = () => {
      current += increment;
      if (current < total) {
        resultEl.textContent = current.toFixed(2);
        requestAnimationFrame(animate);
      } else {
        resultEl.textContent = total.toFixed(2);
      }
    };
    animate();
  }

  // 3️⃣ Load eco tips from JSON file (tips.html)
  const tipsContainer = document.getElementById("tips-container");
  if (tipsContainer) {
    fetch("data.json")
      .then(res => res.json())
      .then(data => {
        tipsContainer.innerHTML = ""; // Clear loading message

        data.tips.forEach((tip, index) => {
          const tipEl = document.createElement("p");
          tipEl.innerHTML = `<i class="fas fa-leaf"></i> ${tip}`;
          tipEl.style.animationDelay = `${index * 0.1}s`; // staggered animation
          tipsContainer.appendChild(tipEl);
        });
      })
      .catch(err => {
        tipsContainer.innerHTML = "<p>❌ Failed to load tips.</p>";
        console.error("Error loading tips:", err);
      });
  }
  console.log("Submitted values:");
console.log("Car:", car);
console.log("Electricity:", electricity);
console.log("Meat:", meat);
console.log("Total:", total);

});
