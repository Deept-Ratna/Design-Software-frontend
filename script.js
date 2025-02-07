document.addEventListener('DOMContentLoaded', function() {
    // Feed button and ion table functionality
    const feedButton = document.getElementById('feedButton');
    const ionTable = document.getElementById('ionTable');
    const closeButton = document.querySelector('.close-button');
    
    // Flow dialog functionality
    const flowButton = document.querySelector('.flow-group .button');
    const flowDialog = document.getElementById('flowDialog');
    const flowCloseButton = flowDialog.querySelector('.close-button');
    const cancelBtn = document.getElementById('cancelBtn');
    const okBtn = document.getElementById('okBtn');

    // Feed button handlers
    feedButton.addEventListener('click', function() {
        if (ionTable.style.display === "none" || ionTable.style.display === "") {
            ionTable.style.display = "block";
        } else {
            ionTable.style.display = "none";
        }
    });

    closeButton.addEventListener('click', function() {
        ionTable.style.display = "none";
    });

    // Flow button handlers
    flowButton.addEventListener('click', function() {
        flowDialog.style.display = 'block';
    });

    flowCloseButton.addEventListener('click', function() {
        flowDialog.style.display = 'none';
    });

    cancelBtn.addEventListener('click', function() {
        flowDialog.style.display = 'none';
    });

    okBtn.addEventListener('click', function() {
        flowDialog.style.display = 'none';
    });

    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === ionTable) {
            ionTable.style.display = "none";
        }
        if (event.target === flowDialog) {
            flowDialog.style.display = 'none';
        }
    });

    // Unit conversion functionality
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    const inputBoxes = document.querySelectorAll('.input-box');

    // Input validation and formatting for all numeric inputs
    inputBoxes.forEach(input => {
        input.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9.]/g, '');
            
            if ((this.value.match(/\./g) || []).length > 1) {
                this.value = this.value.replace(/\.+$/, '');
            }
            
            if (this.value && !isNaN(this.value)) {
                this.value = parseFloat(this.value).toFixed(2);
            }
        });

        input.addEventListener('keypress', function(e) {
            if (!/[\d.]/.test(e.key)) {
                e.preventDefault();
            }
        });
    });

    // Handle unit changes
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            const unitType = this.name;
            const selectedUnit = this.id;
            updateUnits(unitType, selectedUnit);
        });
    });

    // Ion table calculations
    // Select cation inputs (first 9 rows after header)
    const cationInputs = document.querySelectorAll('#ionTable tr:not(.header):not(.total):nth-child(n+2):nth-child(-n+10) input');

// Update the total cations selector
const totalCationsInput = document.querySelector('#ionTable tr.total:nth-child(11) input');
    
    // Select anion inputs (remaining rows before last total row)
    const anionInputs = document.querySelectorAll('#ionTable tr:not(.header):not(.total):nth-child(n+11):not(:last-child) td:last-child input');
    
    // Select total fields
    // const totalCationsInput = document.querySelector('#ionTable tr.total:first-of-type td:last-child input');
    const totalAnionsInput = document.querySelector('#ionTable tr.total:last-child td:last-child input');

    // Add event listeners to all cation and anion inputs
    [...cationInputs, ...anionInputs].forEach(input => {
        input.addEventListener('input', function() {
            // Input validation
            this.value = this.value.replace(/[^0-9.]/g, '');
            
            if ((this.value.match(/\./g) || []).length > 1) {
                this.value = this.value.replace(/\.+$/, '');
            }
            
            if (this.value && !isNaN(this.value)) {
                this.value = parseFloat(this.value).toFixed(2);
            }

            calculateTotals();
        });

        // Prevent invalid keystrokes
        input.addEventListener('keypress', function(e) {
            if (!/[\d.]/.test(e.key)) {
                e.preventDefault();
            }
        });
    });

    function calculateTotals() {
        // Calculate cations total
        let cationSum = 0;
        cationInputs.forEach(input => {
            const value = parseFloat(input.value) || 0;
            cationSum += value;
        });
        if (totalCationsInput) {
            totalCationsInput.value = cationSum.toFixed(2);
        }

        // Calculate anions total
        let anionSum = 0;
        anionInputs.forEach(input => {
            const value = parseFloat(input.value) || 0;
            anionSum += value;
        });
        if (totalAnionsInput) {
            totalAnionsInput.value = anionSum.toFixed(2);
        }
    }

    function updateUnits(type, unit) {
        console.log(`Changed ${type} unit to ${unit}`);
        
        switch(type) {
            case 'flow':
                // Convert flow values based on selected unit
                break;
            case 'pressure':
                // Convert pressure values
                break;
            case 'temperature':
                // Convert temperature values
                break;
        }
    }

    // Initial calculation
    calculateTotals();
});

// Get DOM elements
const productButton = document.querySelector('.split-content1 .button');
const concentrateButton = document.querySelector('.split-content2 .button');
const ionModal = document.getElementById('ionTable');
const closeButtons = document.querySelectorAll('.close-button');

// Ion conversion factors
const ionFactors = {
    'Ca': 0.0499,
    'Mg': 0.0822,
    'Na': 0.0435,
    'K': 0.0256,
    'NH4': 0.0554,
    'Ba': 0.0146,
    'Sr': 0.0228,
    'Fe': 0.0358,
    'Mn': 0.0364,
    'SO4': 0.0208,
    'Cl': 0.0282,
    'F': 0.0526,
    'NO3': 0.0161,
    'Br': 0.0125,
    'PO4': 0.0316,
    'B': 0.0925,
    'SiO2': 0.0166,
    'H2S': 0.0588,
    'HCO3': 0.0164,
    'CO2': 0.0227,
    'CO3': 0.0333
};

// Event Listeners
productButton.addEventListener('click', () => showIonTable('product'));
concentrateButton.addEventListener('click', () => showIonTable('concentrate'));

closeButtons.forEach(button => {
    button.addEventListener('click', closeModal);
});

// Show Ion Table Modal
function showIonTable(type) {
    ionModal.style.display = 'block';
    // Add logic to differentiate between product and concentrate if needed
}

// Close Modal
function closeModal() {
    ionModal.style.display = 'none';
}

// Calculate meq/l values
function calculateMeq(mgValue, ion) {
    return (parseFloat(mgValue) * ionFactors[ion]).toFixed(4);
}

// Update Totals
function updateTotals() {
    let totalCationsMg = 0;
    let totalCationsMeq = 0;
    let totalAnionsMg = 0;
    let totalAnionsMeq = 0;

    // Calculate totals for cations and anions
    // Add your calculation logic here

    // Update total fields
    document.querySelector('tr.total td:nth-child(2) input').value = totalCationsMg.toFixed(2);
    document.querySelector('tr.total td:nth-child(3) input').value = totalCationsMeq.toFixed(4);
}

// Add input event listeners to mg/l inputs
document.querySelectorAll('table input[type="text"]').forEach(input => {
    input.addEventListener('input', function() {
        // Calculate meq/l and update totals
        updateTotals();
    });
});

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === ionModal) {
        closeModal();
    }
});
