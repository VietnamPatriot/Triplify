document.addEventListener('DOMContentLoaded', function() {
    // Account dropdown toggle
    document.querySelector('.account-btn').addEventListener('click', function(e) {
        e.preventDefault();
        var dropdown = document.querySelector('.dropdown-content');
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.account-dropdown')) {
            document.querySelector('.dropdown-content').style.display = 'none';
        }
    });

    // Change Password modal
    document.getElementById('changePasswordBtn').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('passwordModal').style.display = 'block';
    });

    // Close modal
    document.querySelector('.close-modal').addEventListener('click', function() {
        document.getElementById('passwordModal').style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === document.getElementById('passwordModal')) {
            document.getElementById('passwordModal').style.display = 'none';
        }
    });

    // Password form submission
    document.getElementById('passwordForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const currentPass = document.getElementById('currentPassword').value;
        const newPass = document.getElementById('newPassword').value;
        const confirmPass = document.getElementById('confirmPassword').value;

        if (newPass !== confirmPass) {
            alert('New passwords do not match!');
            return;
        }

        // Here you would add your actual password change API call
        console.log('Password change requested', {
            currentPassword: currentPass,
            newPassword: newPass
        });

        alert('Password changed successfully!');
        document.getElementById('passwordModal').style.display = 'none';
        this.reset();
    });

    // Logout functionality
    document.getElementById('logoutBtn').addEventListener('click', function(e) {
        e.preventDefault();
        if (confirm('Are you sure you want to logout?')) {
            // Here you would add your actual logout API call
            console.log('User logged out');
            window.location.href = '/login.html'; // Redirect to login page
        }
    });
});