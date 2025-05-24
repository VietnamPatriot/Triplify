document.addEventListener('DOMContentLoaded', function() {
    // Account dropdown toggle
    const accountBtn = document.querySelector('.account-btn');
    const dropdownContent = document.querySelector('.dropdown-content');
    
    if (accountBtn) {
        accountBtn.addEventListener('click', function(e) {
            e.preventDefault();
            dropdownContent.style.display = 
                dropdownContent.style.display === 'block' ? 'none' : 'block';
        });
    }

    // Change Password button
    const changePasswordBtn = document.getElementById('changePasswordBtn');
    const passwordModal = document.getElementById('passwordModal');
    
    if (changePasswordBtn) {
        changePasswordBtn.addEventListener('click', function(e) {
            e.preventDefault();
            dropdownContent.style.display = 'none'; // Close dropdown
            passwordModal.style.display = 'block'; // Open modal
        });
    }

    // Close modal when clicking X
    const closeModal = document.querySelector('.close-modal');
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            passwordModal.style.display = 'none';
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === passwordModal) {
            passwordModal.style.display = 'none';
        }
    });

    // Form submission
    const passwordForm = document.getElementById('passwordForm');
    if (passwordForm) {
        passwordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Your password change logic here
            alert('Password change functionality would execute here');
            passwordModal.style.display = 'none';
        });
    }
});