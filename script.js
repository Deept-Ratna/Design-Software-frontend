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
