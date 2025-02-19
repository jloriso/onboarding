# WIIT Onboarding Application

This project is a web application designed for onboarding new members or DJs for WIIT (presumably a radio station or similar organization).  It allows users to submit their information, including co-host details, show information, and IIT/Community DJ status.  The data is saved to a CSV file on the server.  The application also includes a login system to restrict access to data submission and viewing.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [How to Use](#how-to-use)
- [Configuration](#configuration)
- [Directory Structure](#directory-structure)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## Features

- Secure login with password hashing.
- Form for submitting host, co-host, and show information.
- Dynamic addition of co-host fields.
- Data saved to a CSV file on the server.
- Ability to view the saved data in a separate page (protected by login).
- Confirmation popups for form reset and logout.

## Technologies Used

- Python (Flask framework)
- JavaScript
- HTML
- CSS
- Flask-Login
- Flask-Vault (for secret key management)
- configparser (for reading configuration files)

## How to Use

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jloriso/onboarding.git
   cd onboarding
   ```

2. **Create the `vault.ini` configuration file:** See the [Configuration](#configuration) section below.

3. **Start the Flask server:**

   ```bash
   python onboarding_Server.py
   ```

4. **Open the application in your browser:**
   Go to `http://127.0.0.1:5000/` (or the address shown in your terminal when you start the server).

5. **Login:** Enter the username and password in the login form. (See the [Configuration](#configuration) section for how to set the initial password).

6. **Fill out the form:** Enter the required information for the host, co-hosts, and show. Click "Add Cohost" to add more co-hosts.

7. **Save data:** Click the "Save" button to save the data to the `wiit_onboarding_data.csv` file.

8. **View Data:** Click the "View Data" button to see the saved data in a separate page.

9. **Reset Form:** Click the "Reset Form" button to clear the form.

10. **Logout:** Click the "Logout" button to log out of the application.

## Configuration

1. **`vault.ini`:** This file stores your secret access key. It *must* be in the same directory as `onboarding_Server.py`.

   ```ini
   [secrets]
   ACCESS_KEY = your_secret_key  # Replace with a strong, unique key
   ```

   **Important:** Replace `your_secret_key` with a strong, unique password. This is used to protect your application. Never commit the actual key to version control.

2. **Multiple Keys** You can enter multiple access keys following this format:

   ```
    [secrets]
    ACCESS_KEY_1 = test1
    ACCESS_KEY_2 = test2
    ACCESS_KEY_3 = test3
    ACCESS_KEY_4 = test4
   ```

## Directory Structure

```
your_project/
├── onboarding_Server.py  # The main Python application file
├── vault.ini             # Configuration file for secrets
└── templates/             # HTML templates
    ├── onboarding.html   # Main onboarding form
    └── login.html        # Login page
    └── view_data_page.html  # Page to view the data
└── static/                 # Static files (JavaScript, CSS)
    └── script.js         # JavaScript code
    └── styles.css        # CSS styles (if any)
```

## Future Enhancements

- Implement database integration for user management and data storage.
- Add user roles and permissions to add new passcodes and viewing data vs submitting data permissions
- Implement more robust security measures.
- Add more styling and improve the user interface.
- Implement search and filtering for the data viewing page.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the GNU General Public License v3.
